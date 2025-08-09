import { CreateRoundRoomInput } from './create-round-room.input'
import { InputType, Field, Int, PartialType } from '@nestjs/graphql'

@InputType()
export class UpdateRoundRoomInput extends PartialType(CreateRoundRoomInput) {
  @Field(() => Int)
  id: number
}
