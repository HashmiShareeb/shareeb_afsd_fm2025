import { CreateSpecialrequestInput } from './create-specialrequest.input'
import { InputType, Field, Int, PartialType } from '@nestjs/graphql'

@InputType()
export class UpdateSpecialrequestInput extends PartialType(
  CreateSpecialrequestInput,
) {
  @Field(() => Int)
  id: number
}
