import { CreateChecklistitemInput } from './create-checklistitem.input'
import { InputType, Field, Int, PartialType } from '@nestjs/graphql'

@InputType()
export class UpdateChecklistitemInput extends PartialType(
  CreateChecklistitemInput,
) {
  @Field(() => Int)
  id: number
}
