import { InputType, Field } from '@nestjs/graphql'

@InputType()
export class CreateSpecialrequestInput {
  @Field(() => String)
  title: string

  @Field(() => String)
  details: string

  @Field(() => String)
  roomId: string

  @Field(() => String)
  buildingId: string
}
