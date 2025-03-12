import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { OrdersService } from './orders.service';
import { Order } from './entities/order.entity';

@Resolver(() => Order)
export class OrdersResolver {
  constructor(private readonly ordersService: OrdersService) {}

  @Query(() => [Order])
  async orders(): Promise<Order[]> {
    return this.ordersService.findAll();
  }

  @Query(() => Order, { nullable: true })
  async order(@Args('id', { type: () => ID }) id: string): Promise<Order | null> {
    return this.ordersService.findOne(id);
  }

  @Mutation(() => Order)
  async purchaseTickets(
    @Args('eventId', { type: () => ID }) eventId: string,
    @Args('quantity') quantity: number,
  ): Promise<Order> {
    return this.ordersService.createOrder(eventId, quantity);
  }
} 