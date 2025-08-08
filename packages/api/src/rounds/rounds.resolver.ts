import {
  Resolver,
  Query,
  Mutation,
  Args,
  Parent,
  ResolveField,
} from '@nestjs/graphql'
import { RoundsService } from './rounds.service'
import { Round } from './entities/round.entity'
// import { AllowedRoles } from 'src/decorators/roles.decorator'
// import { Role } from 'src/user/entities/user.entity'
import { UserService } from 'src/user/user.service'
import { CreateRoundInput } from './dto/create-round.input'
import { User } from 'src/user/entities/user.entity'

// import { UpdateRoundInput } from './dto/update-round.input'

@Resolver(() => Round)
export class RoundsResolver {
  constructor(
    private readonly roundsService: RoundsService,
    private readonly userService: UserService,
  ) {}

  @Mutation(() => Round)
  createRound(@Args('createRoundInput') createRoundInput: CreateRoundInput) {
    return this.roundsService.create(createRoundInput)
  }

  @ResolveField(() => User, { nullable: true })
  async assignedTo(@Parent() round: Round): Promise<User | null> {
    if (!round.assignedToId) return null
    return this.userService.findOne(round.assignedToId)
  }

  // @Mutation(() => Round)
  // createRound(
  //   @Args('createRoundInput') createRoundInput: CreateRoundInput,
  //   @Context() context: { user: { uid: string } },
  // ) {
  //   const firebaseUid = context.user.uid // Extract the Firebase UID from the context
  //   return this.roundsService.create(createRoundInput, firebaseUid)
  // }

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
