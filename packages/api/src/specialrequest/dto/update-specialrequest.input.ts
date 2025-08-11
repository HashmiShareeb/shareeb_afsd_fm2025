import { IsEnum } from 'class-validator'
import { CreateSpecialrequestInput } from './create-specialrequest.input'
import { InputType, Field, PartialType } from '@nestjs/graphql'
import { SpecialRequestStatus } from '../entities/specialrequest.entity'

@InputType()
export class UpdateSpecialrequestInput extends PartialType(
  CreateSpecialrequestInput,
) {
  @Field({ nullable: true })
  title?: string

  @Field({ nullable: true })
  description?: string

  @IsEnum(SpecialRequestStatus)
  @Field()
  status: SpecialRequestStatus
}
