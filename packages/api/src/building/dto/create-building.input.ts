import { InputType, Field } from '@nestjs/graphql'

@InputType()
export class CreateBuildingInput {
  @Field() // GraphQL input field
  name: string

  @Field() // GraphQL input field
  address: string

  @Field() // GraphQL input field
  type: string

  @Field({ nullable: true }) // Optional field
  description?: string

  @Field({ nullable: true })
  imageUrl?: string
}
