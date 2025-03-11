import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class PurchaseTicketInput {
  @Field(() => Int)
  eventId: number;

  @Field(() => Int)
  tickets: number;
}
