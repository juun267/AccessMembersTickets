import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class PurchaseTicketInput {
  @Field(() => Int)
  eventId!: number;  // Add non-null assertion

  @Field(() => Int)
  tickets!: number;  // Add non-null assertion
}
