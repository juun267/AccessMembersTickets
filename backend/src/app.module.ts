import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';  // Import ApolloDriver
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { Event } from './entities/event.entity';
import { Order } from './entities/order.entity';
import { EventResolver } from './resolvers/event.resolver';
import { EventService } from './services/event.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [Event, Order],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Event, Order]),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,  // Specify the Apollo Driver
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'), // Generate schema automatically
      playground: true, // Enable GraphQL Playground (optional)
    }),
  ],
  providers: [EventResolver, EventService],
})
export class AppModule {}
