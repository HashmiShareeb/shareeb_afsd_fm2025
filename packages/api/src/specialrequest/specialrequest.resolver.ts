import {
  Resolver,
  Query,
  Mutation,
  Args,
  Parent,
  ResolveField,
} from '@nestjs/graphql'
import { SpecialrequestService } from './specialrequest.service'
import { Specialrequest } from './entities/specialrequest.entity'
import { CreateSpecialrequestInput } from './dto/create-specialrequest.input'
import { UserService } from 'src/user/user.service'
import { User } from 'src/user/entities/user.entity'
// import { UpdateSpecialrequestInput } from './dto/update-specialrequest.input';

@Resolver(() => Specialrequest)
export class SpecialrequestResolver {
  constructor(
    private readonly specialrequestService: SpecialrequestService,
    private readonly userService: UserService,
  ) {}

  @Mutation(() => Specialrequest)
  createSpecialrequest(
    @Args('createSpecialrequestInput')
    createSpecialrequestInput: CreateSpecialrequestInput,
  ): Promise<Specialrequest> {
    return this.specialrequestService.create(createSpecialrequestInput)
  }

  @ResolveField(() => User, { nullable: true })
  async requestedBy(@Parent() request: Specialrequest): Promise<User | null> {
    console.log('Resolving requestedBy for request', request.requestId)

    if (!request.requestedById) return null
    return this.userService.findOne(request.requestedById)
  }

  @Query(() => [Specialrequest], { name: 'specialrequest' })
  findAll() {
    return this.specialrequestService.findAll()
  }

  @Query(() => Specialrequest, { name: 'specialrequestById' })
  findOne(@Args('requestId', { type: () => String }) requestId: string) {
    return this.specialrequestService.findOne(requestId)
  }

  // @Mutation(() => Specialrequest)
  // updateSpecialRequestStatus(
  //   @Args('requestId') requestId: string,
  //   @Args('status') status: string,
  // ) {
  //   return this.specialrequestService.updateStatus(requestId, status)
  // }

  @Query(() => [Specialrequest])
  async mySpecialRequests(@Args('userId') userId: string) {
    const user = await this.userService.findOne(userId)
    if (!user) return []

    return this.specialrequestService.findByUser(userId)
  }

  @Mutation(() => Specialrequest)
  removeSpecialrequest(
    @Args('requestId', { type: () => String }) requestId: string,
  ) {
    return this.specialrequestService.remove(requestId)
  }
}
