import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@ObjectType()
@Entity()
export class Event {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;  // Add non-null assertion

  @Field()
  @Column()
  name!: string;  // Add non-null assertion

  @Field()
  @Column('datetime')
  date!: Date;  // Add non-null assertion

  @Field(() => Int)
  @Column('int')
  availableTickets!: number;  // Add non-null assertion
}
