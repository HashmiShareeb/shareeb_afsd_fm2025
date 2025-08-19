import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql'
import { UserService } from './user.service'
import { Role, User } from './entities/user.entity'
import { FirebaseGuard } from 'src/authentication/guards/firebase.guard'
import { CreateUserInput } from './dto/create-user.input'
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator'
import { AllowedRoles } from 'src/decorators/roles.decorator'
import { UpdateUserInput } from './dto/update-user.input'

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  // @Mutation(() => User)
  // createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
  //   return this.userService.create(createUserInput)
  // }

  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.userService.findAll()
  }

  @Query(() => User, { name: 'user' })
  //changed to ID from Int to fetch user by id
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.userService.findOne(id)
  }

  //@UseGuards(FirebaseGuard)
  @Mutation(() => User)
  createOwnUseraccount(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ) {
    return this.userService.create(createUserInput)
  }

  @AllowedRoles(Role.ADMIN)
  @Mutation(() => User)
  createAdmin(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.createAdmin(createUserInput)
  }

  @Query(() => User, { name: 'userByUid' })
  userByUid(@Args('uid', { type: () => String }) uid: string) {
    return this.userService.findOneByFirebaseUid(uid)
  }

  @UseGuards(FirebaseGuard)
  @Mutation(() => User)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.userService.update(updateUserInput.uid, updateUserInput)
  }

  @AllowedRoles(Role.ADMIN)
  @Mutation(() => User)
  updateUserRoleName(
    @Args('uid', { type: () => String }) uid: string,
    @Args('role', { type: () => String }) role: Role,
    @Args('name', { type: () => String }) name: string,
  ) {
    return this.userService.updateRoleName(uid, role, name)
  }

  @Mutation(() => User)
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.userService.remove(id)
  }

  @Query(() => [User], { name: 'usersByRole' })
  findByRole(@Args('role', { type: () => String }) role: Role) {
    return this.userService.findByRole(role)
  }
}
