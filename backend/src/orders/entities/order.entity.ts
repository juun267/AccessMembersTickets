import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ObjectType, Field, ID, Float, Int } from '@nestjs/graphql';
import { Event } from '../../events/entities/event.entity';

@ObjectType()
@Entity('orders')
export class Order {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ name: 'order_number', nullable: false })
  orderNumber: string;

  @Field(() => Event)
  @ManyToOne(() => Event, event => event.orders)
  @JoinColumn({ name: 'event_id' })
  event: Event;

  @Field(() => Int)
  @Column({ nullable: false })
  quantity: number;

  @Field(() => Float)
  @Column({ name: 'total_amount', type: 'decimal', precision: 10, scale: 2, nullable: false })
  totalAmount: number;

  @Field()
  @Column({ nullable: false, default: 'completed' })
  status: string;

  @Field()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
} 