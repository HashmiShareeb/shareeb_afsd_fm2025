import { InputType, Int, Field } from '@nestjs/graphql'
import { MeterType } from '../entities/energy-reading.entity'
import { IsEnum } from 'class-validator'

@InputType()
export class CreateEnergyReadingInput {
  @Field()
  buildingId: string

  @Field(() => MeterType)
  @IsEnum(MeterType)
  meterType: MeterType

  @Field(() => Int)
  value: number

  @Field()
  recordedById: string

  @Field()
  recordedAt: Date
}
