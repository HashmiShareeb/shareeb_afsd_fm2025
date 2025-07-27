import { InputType, Int, Field } from '@nestjs/graphql'

@InputType()
export class CreateRoomInput {
  @Field(() => String)
  name: string

  @Field(() => Int)
  floor: number

  @Field(() => String)
  buildingId: string

  @Field(() => Int)
  capacity: number
}
