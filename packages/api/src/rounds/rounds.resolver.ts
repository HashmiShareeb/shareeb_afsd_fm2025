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
import { Role, User } from 'src/user/entities/user.entity'
import { UseGuards } from '@nestjs/common'
import { AllowedRoles } from 'src/decorators/roles.decorator'
import {
  Checklistitem,
  ChecklistItemStatus,
} from 'src/checklistitem/entities/checklistitem.entity'
import { ObjectId } from 'mongodb'
import { RoundRoomStatus } from 'src/round-room/entities/round-room.entity'

// import { UpdateRoundInput } from './dto/update-round.input'

@Resolver(() => Round)
export class RoundsResolver {
  constructor(
    private readonly roundsService: RoundsService,
    private readonly userService: UserService,
  ) {}

  @Mutation(() => Round)
  async createRound(
    @Args('createRoundInput') createRoundInput: CreateRoundInput,
  ) {
    return await this.roundsService.create(createRoundInput)
  }

  @Mutation(() => Checklistitem)
  async addChecklistItem(
    @Args('roundId') roundId: string,
    @Args('roundRoomId') roundRoomId: string,
    @Args('label') label: string,
    @Args('notes', { nullable: true }) notes?: string,
  ): Promise<Checklistitem> {
    return this.roundsService.addChecklistItem(
      roundId,
      roundRoomId,
      label,
      notes,
    )
  }

  @Mutation(() => Checklistitem)
  async updateChecklistItem(
    @Args('roundId') roundId: string,
    @Args('roundRoomId') roundRoomId: string,
    @Args('itemId') itemId: string,
    @Args('status', { type: () => ChecklistItemStatus })
    status: ChecklistItemStatus, //ensure its ENUM
  ) {
    return this.roundsService.updateChecklistItem(
      roundId,
      roundRoomId,
      itemId,
      status,
    )
  }

  @ResolveField(() => User, { nullable: true })
  async assignedTo(@Parent() round: Round): Promise<User | null> {
    if (!round.assignedToId) return null
    return this.userService.findOne(round.assignedToId)
  }

  @UseGuards()
  @AllowedRoles(Role.MANAGER)
  @Query(() => [Round], { name: 'myRounds' })
  async myRounds(@Args('userId', { type: () => String }) userId: string) {
    const user = await this.userService.findOne(userId)
    if (!user) return []

    const rounds = await this.roundsService.findByUser(userId)

    // Ensure every checklist is at least []
    // ensure every room has roundRoomId + checklist
    rounds.forEach(r =>
      r.rooms.forEach(room => {
        room.roundRoomId = room.roundRoomId ?? new ObjectId().toString()
        room.checklist = room.checklist ?? []
        room.status = room.status ?? RoundRoomStatus.OPEN
      }),
    )

    return rounds
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
