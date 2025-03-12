import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './entities/event.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) {}

  async findAll(): Promise<Event[]> {
    return this.eventRepository.find();
  }

  async findOne(id: string): Promise<Event | null> {
    return this.eventRepository.findOne({ where: { id } });
  }

  async updateAvailableTickets(id: string, quantity: number): Promise<Event | null> {
    const event = await this.findOne(id);
    if (!event) return null;
    event.availableTickets -= quantity;
    event.isSoldOut = event.availableTickets === 0;
    return this.eventRepository.save(event);
  }
} 