import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { RoundRoomService } from './round-room.service'
import { RoundRoom } from './entities/round-room.entity'
// import { CreateRoundRoomInput } from './dto/create-round-room.input'
// import { UpdateRoundRoomInput } from './dto/update-round-room.input'

@Resolver(() => RoundRoom)
export class RoundRoomResolver {
  constructor(private readonly roundRoomService: RoundRoomService) {}

  // @Mutation(() => RoundRoom)
  // createRoundRoom(
  //   @Args('createRoundRoomInput') createRoundRoomInput: CreateRoundRoomInput,
  // ) {
  //   return this.roundRoomService.create(createRoundRoomInput)
  // }

  @Query(() => [RoundRoom], { name: 'roundRoom' })
  findAll() {
    return this.roundRoomService.findAll()
  }

  @Query(() => RoundRoom, { name: 'roundRoom' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.roundRoomService.findOne(id)
  }

  // @Mutation(() => RoundRoom)
  // updateRoundRoom(
  //   @Args('updateRoundRoomInput') updateRoundRoomInput: UpdateRoundRoomInput,
  // ) {
  //   return this.roundRoomService.update(
  //     updateRoundRoomInput.id,
  //     updateRoundRoomInput,
  //   )
  // }

  @Mutation(() => RoundRoom)
  removeRoundRoom(@Args('id', { type: () => Int }) id: number) {
    return this.roundRoomService.remove(id)
  }
}
