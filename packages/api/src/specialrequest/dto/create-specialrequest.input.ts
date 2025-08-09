import { InputType, Int, Field } from '@nestjs/graphql'

@InputType()
export class CreateSpecialrequestInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number
}
