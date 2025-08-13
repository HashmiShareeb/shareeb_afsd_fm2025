import { IsEnum } from 'class-validator'
import { ChecklistItemStatus } from '../entities/checklistitem.entity'
import { CreateChecklistitemInput } from './create-checklistitem.input'
import { InputType, Field, PartialType, ID } from '@nestjs/graphql'

@InputType()
export class UpdateChecklistitemInput extends PartialType(
  CreateChecklistitemInput,
) {
  @Field(() => ID)
  itemId: string

  @IsEnum(ChecklistItemStatus)
  @Field()
  status: ChecklistItemStatus

  @Field({ nullable: true })
  notes?: string
}
