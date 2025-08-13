import { InputType, Field } from '@nestjs/graphql'
import { ChecklistItemStatus } from '../entities/checklistitem.entity'
import { IsEnum } from 'class-validator'

@InputType()
export class CreateChecklistitemInput {
  @Field()
  label: string

  @IsEnum(ChecklistItemStatus)
  @Field()
  status: ChecklistItemStatus

  @Field({ nullable: true })
  notes?: string
}
