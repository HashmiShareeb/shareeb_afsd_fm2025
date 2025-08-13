import { InputType, Field } from '@nestjs/graphql'
// import { RoundStatus } from '../entities/round.entity'
// import { IsEnum } from 'class-validator'
import { CreateRoundRoomInput } from 'src/round-room/dto/create-round-room.input'

@InputType()
export class CreateRoundInput {
  @Field()
  name: string

  @Field()
  assignedToId: string // User ID to whom the round is assigned

  @Field()
  buildingId: string

  // @IsEnum(RoundStatus)
  // @Field(() => String, { nullable: true })
  // status: RoundStatus

  @Field(() => [CreateRoundRoomInput])
  rooms: CreateRoundRoomInput[]
}
