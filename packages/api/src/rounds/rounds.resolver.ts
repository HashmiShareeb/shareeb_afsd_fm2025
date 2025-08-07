import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { RoundsService } from './rounds.service'
import { Round } from './entities/round.entity'
// import { AllowedRoles } from 'src/decorators/roles.decorator'
// import { Role } from 'src/user/entities/user.entity'
//import { UserService } from 'src/user/user.service'
import { CreateRoundInput } from './dto/create-round.input'
// import { UpdateRoundInput } from './dto/update-round.input'

@Resolver(() => Round)
export class RoundsResolver {
  constructor(
    private readonly roundsService: RoundsService,
    //private readonly userService: UserService,
  ) {}

  @Mutation(() => Round)
  createRound(@Args('createRoundInput') createRoundInput: CreateRoundInput) {
    return this.roundsService.create(createRoundInput)
  }

  @Query(() => [Round], { name: 'rounds' })
  findAll() {
    return this.roundsService.findAll()
  }

  @Query(() => Round, { name: 'round' })
  findOne(@Args('roundId', { type: () => String }) roundId: string) {
    return this.roundsService.findOne(roundId)
  }

  // @Mutation(() => Round)
  // updateRound(@Args('updateRoundInput') updateRoundInput: UpdateRoundInput) {
  //   return this.roundsService.update(updateRoundInput.id, updateRoundInput);
  // }

  @Mutation(() => Round)
  removeRound(@Args('roundId', { type: () => String }) roundId: string) {
    return this.roundsService.remove(roundId)
  }
}
