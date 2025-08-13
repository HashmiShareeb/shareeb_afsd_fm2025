import { InputType, Field } from '@nestjs/graphql'

@InputType()
export class CreateSpecialrequestInput {
  @Field()
  title: string

  @Field()
  description: string

  @Field()
  requestedById: string

  @Field()
  roomId: string

  @Field()
  buildingId: string
}
