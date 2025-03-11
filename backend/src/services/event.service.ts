import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from '../entities/event.entity';
import { Order } from '../entities/order.entity';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) {}

  async getAllEvents(): Promise<Event[]> {
    return this.eventRepository.find();
  }

  async purchaseTickets(eventId: number, tickets: number): Promise<Order> {
    const event = await this.eventRepository.findOneBy({ id: eventId });
    if (!event) {
      throw new BadRequestException('Event not found');
    }
    if (tickets > event.availableTickets) {
      throw new BadRequestException('Not enough tickets available');
    }
    // Deduct purchased tickets
    event.availableTickets -= tickets;
    await this.eventRepository.save(event);

    // Create order
    const order = new Order();
    order.event = event;
    order.ticketsPurchased = tickets;
    order.orderNumber = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    return this.orderRepository.save(order);
  }
}
