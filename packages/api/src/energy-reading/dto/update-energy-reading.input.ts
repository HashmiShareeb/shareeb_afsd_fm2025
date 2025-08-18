import { CreateEnergyReadingInput } from './create-energy-reading.input'
import { InputType, Field, Int, PartialType } from '@nestjs/graphql'

@InputType()
export class UpdateEnergyReadingInput extends PartialType(
  CreateEnergyReadingInput,
) {
  @Field(() => Int)
  id: number
}
