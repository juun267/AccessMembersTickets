import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { EventsService } from '../events/events.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly eventsService: EventsService,
  ) {}

  async findAll(): Promise<Order[]> {
    return this.orderRepository.find({ relations: ['event'] });
  }

  async findOne(id: string): Promise<Order | null> {
    return this.orderRepository.findOne({ 
      where: { id },
      relations: ['event']
    });
  }

  async createOrder(eventId: string, quantity: number): Promise<Order> {
    const event = await this.eventsService.findOne(eventId);

    if (!event) {
      throw new BadRequestException('Event not found');
    }

    if (event.isSoldOut || event.availableTickets < quantity) {
      throw new BadRequestException('Not enough tickets available');
    }

    const order = this.orderRepository.create({
      event,
      quantity,
      totalAmount: event.price * quantity,
      orderNumber: `ORD-${Date.now()}`,
      status: 'completed'
    });

    await this.eventsService.updateAvailableTickets(eventId, quantity);
    return this.orderRepository.save(order);
  }
} 