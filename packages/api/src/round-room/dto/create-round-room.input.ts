import { InputType, Field } from '@nestjs/graphql'

@InputType()
export class CreateRoundRoomInput {
  @Field(() => String)
  roomId: string // ID of the room to be added to the round

  @Field()
  order: number

  @Field(() => String, { nullable: true })
  notes?: string // Optional notes for the room in the round
}
