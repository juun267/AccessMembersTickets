import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { EventService } from '../services/event.service';
import { PurchaseTicketInput } from '../dtos/purchase-ticket.input';
import { Event } from '../entities/event.entity';
import { Order } from '../entities/order.entity';

@Resolver()
export class EventResolver {
  constructor(private readonly eventService: EventService) {}

  @Query(() => [Event])
  async events(): Promise<Event[]> {
    return this.eventService.getAllEvents();
  }

  @Mutation(() => Order)
  async purchaseTickets(
    @Args('purchaseTicketInput') purchaseTicketInput: PurchaseTicketInput,
  ): Promise<Order> {
    return this.eventService.purchaseTickets(
      purchaseTicketInput.eventId,
      purchaseTicketInput.tickets,
    );
  }
}
