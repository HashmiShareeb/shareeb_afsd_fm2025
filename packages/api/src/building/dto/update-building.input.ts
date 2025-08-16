import { CreateBuildingInput } from './create-building.input'
import { InputType, Field, PartialType } from '@nestjs/graphql'

@InputType()
export class UpdateBuildingInput extends PartialType(CreateBuildingInput) {
  // @Field(() => ID)
  // id: string

  @Field({ nullable: true })
  name?: string

  @Field({ nullable: true })
  address?: string

  @Field({ nullable: true })
  type?: string

  @Field({ nullable: true })
  imageUrl?: string

  @Field({ nullable: true })
  description?: string
}
