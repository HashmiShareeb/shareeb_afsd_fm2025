import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { ChecklistitemService } from './checklistitem.service'
import { Checklistitem } from './entities/checklistitem.entity'
import { CreateChecklistitemInput } from './dto/create-checklistitem.input'
import { UpdateChecklistitemInput } from './dto/update-checklistitem.input'

@Resolver(() => Checklistitem)
export class ChecklistitemResolver {
  constructor(private readonly checklistitemService: ChecklistitemService) {}

  @Mutation(() => Checklistitem)
  createChecklistitem(
    @Args('createChecklistitemInput')
    createChecklistitemInput: CreateChecklistitemInput,
  ) {
    return this.checklistitemService.create(createChecklistitemInput)
  }

  @Query(() => [Checklistitem], { name: 'checklistitem' })
  findAll() {
    return this.checklistitemService.findAll()
  }

  @Query(() => Checklistitem, { name: 'checklistitem' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.checklistitemService.findOne(id)
  }

  @Mutation(() => Checklistitem)
  updateChecklistitem(
    @Args('updateChecklistitemInput')
    updateChecklistitemInput: UpdateChecklistitemInput,
  ) {
    return this.checklistitemService.update(
      updateChecklistitemInput.id,
      updateChecklistitemInput,
    )
  }

  @Mutation(() => Checklistitem)
  removeChecklistitem(@Args('id', { type: () => Int }) id: number) {
    return this.checklistitemService.remove(id)
  }
}
