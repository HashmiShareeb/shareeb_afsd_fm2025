import { InputType, Field } from '@nestjs/graphql'
import { ReportStatus } from '../entities/maintenancereport.entity'
import { IsEnum } from 'class-validator'

@InputType()
export class CreateMaintenancereportInput {
  @Field({ nullable: true })
  title?: string

  @Field()
  roomId: string

  @Field()
  description: string

  @IsEnum(ReportStatus)
  @Field(() => ReportStatus, { nullable: true, defaultValue: ReportStatus.NEW })
  status?: ReportStatus

  @Field()
  reportedById: string
}
