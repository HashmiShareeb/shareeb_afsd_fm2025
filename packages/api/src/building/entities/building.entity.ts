import { ObjectType, Field, ID } from '@nestjs/graphql'

@ObjectType()
export class Building {
  @Field(() => ID)
  id: string

  @Field()
  name: string

  @Field()
  address: string
}
