import { InputType, Field } from '@nestjs/graphql'

@InputType()
export class CreateReportInput {
  @Field()
  title: string

  @Field()
  description: string

  @Field()
  roomId: string
}
