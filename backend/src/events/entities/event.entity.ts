import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { ObjectType, Field, ID, Float, Int } from '@nestjs/graphql';
import { Order } from '../../orders/entities/order.entity';

@ObjectType()
@Entity('events')
export class Event {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ nullable: false })
  name: string;

  @Field()
  @Column({ nullable: false, type: 'text' })
  description: string;

  @Field()
  @Column({ nullable: false, type: 'timestamp' })
  date: Date;

  @Field(() => Int)
  @Column({ name: 'total_tickets', nullable: false })
  totalTickets: number;

  @Field(() => Int)
  @Column({ name: 'available_tickets', nullable: false })
  availableTickets: number;

  @Field(() => Float)
  @Column('decimal', { precision: 10, scale: 2, nullable: false })
  price: number;

  @Field()
  @Column({ name: 'is_sold_out', default: false })
  isSoldOut: boolean;

  @Field()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Field(() => [Order], { nullable: true })
  @OneToMany(() => Order, order => order.event)
  orders: Order[];
} 