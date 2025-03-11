import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { Event } from './entities/event.entity';
import { Order } from './entities/order.entity';
import { EventResolver } from './resolvers/event.resolver';
import { EventService } from './services/event.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite', // using SQLite for demonstration; replace with your SQL DB as needed
      database: 'db.sqlite',
      entities: [Event, Order],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Event, Order]),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
  ],
  providers: [EventResolver, EventService],
})
export class AppModule {}
