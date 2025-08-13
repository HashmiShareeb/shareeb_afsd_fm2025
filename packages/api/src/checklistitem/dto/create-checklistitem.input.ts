import { InputType, Field } from '@nestjs/graphql'
import { ChecklistItemStatus } from '../entities/checklistitem.entity'

@InputType()
export class CreateChecklistitemInput {
  @Field()
  label: string

  @Field(() => ChecklistItemStatus, {
    defaultValue: ChecklistItemStatus.NOT_CHECKED,
  })
  status?: ChecklistItemStatus

  @Field({ nullable: true })
  notes?: string
}
