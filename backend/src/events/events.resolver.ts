import { Resolver, Query, Args, ID } from '@nestjs/graphql';
import { EventsService } from './events.service';
import { Event } from './entities/event.entity';

@Resolver(() => Event)
export class EventsResolver {
  constructor(private readonly eventsService: EventsService) {}

  @Query(() => [Event])
  async events(): Promise<Event[]> {
    return this.eventsService.findAll();
  }

  @Query(() => Event, { nullable: true })
  async event(@Args('id', { type: () => ID }) id: string): Promise<Event | null> {
    return this.eventsService.findOne(id);
  }
} 