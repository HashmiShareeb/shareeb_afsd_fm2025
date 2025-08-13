import { InputType, Int, Field } from '@nestjs/graphql'

@InputType()
export class CreateChecklistitemInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number
}
