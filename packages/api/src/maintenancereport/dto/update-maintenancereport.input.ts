import { CreateMaintenancereportInput } from './create-maintenancereport.input'
import { InputType, Field, Int, PartialType } from '@nestjs/graphql'

@InputType()
export class UpdateMaintenancereportInput extends PartialType(
  CreateMaintenancereportInput,
) {
  @Field(() => Int)
  id: number
}
