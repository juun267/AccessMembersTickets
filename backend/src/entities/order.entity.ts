import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Event } from './event.entity';

@ObjectType()
@Entity()
export class Order {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;  // Add non-null assertion

  @Field()
  @Column()
  orderNumber!: string;  // Add non-null assertion

  @Field(() => Event)
  @ManyToOne(() => Event)
  @JoinColumn({ name: 'eventId' })
  event!: Event;  // Add non-null assertion

  @Field(() => Int)
  @Column('int')
  ticketsPurchased!: number;  // Add non-null assertion
}
