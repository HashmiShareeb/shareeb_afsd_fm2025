import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { SpecialrequestService } from './specialrequest.service'
import { Specialrequest } from './entities/specialrequest.entity'
// import { CreateSpecialrequestInput } from './dto/create-specialrequest.input';
// import { UpdateSpecialrequestInput } from './dto/update-specialrequest.input';

@Resolver(() => Specialrequest)
export class SpecialrequestResolver {
  constructor(private readonly specialrequestService: SpecialrequestService) {}

  // @Mutation(() => Specialrequest)
  // createSpecialrequest(@Args('createSpecialrequestInput') createSpecialrequestInput: CreateSpecialrequestInput) {
  //   return this.specialrequestService.create(createSpecialrequestInput);
  // }

  @Query(() => [Specialrequest], { name: 'specialrequest' })
  findAll() {
    return this.specialrequestService.findAll()
  }

  @Query(() => Specialrequest, { name: 'specialrequest' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.specialrequestService.findOne(id)
  }

  // @Mutation(() => Specialrequest)
  // updateSpecialrequest(@Args('updateSpecialrequestInput') updateSpecialrequestInput: UpdateSpecialrequestInput) {
  //   return this.specialrequestService.update(updateSpecialrequestInput.id, updateSpecialrequestInput);
  // }

  @Mutation(() => Specialrequest)
  removeSpecialrequest(@Args('id', { type: () => Int }) id: number) {
    return this.specialrequestService.remove(id)
  }
}
