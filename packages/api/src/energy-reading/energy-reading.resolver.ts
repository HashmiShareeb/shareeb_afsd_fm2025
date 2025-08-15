import {
  Resolver,
  Query,
  Mutation,
  Args,
  Parent,
  ResolveField,
} from '@nestjs/graphql'
import { EnergyReadingService } from './energy-reading.service'
import { EnergyReading, MeterType } from './entities/energy-reading.entity'
//import { UpdateEnergyReadingInput } from './dto/update-energy-reading.input'
import { CreateEnergyReadingInput } from './dto/create-energy-reading.input'
import { User } from 'src/user/entities/user.entity'
import { UserService } from 'src/user/user.service'

@Resolver(() => EnergyReading)
export class EnergyReadingResolver {
  constructor(
    private readonly energyReadingService: EnergyReadingService,
    private readonly userService: UserService,
  ) {}

  @Mutation(() => EnergyReading)
  createEnergyReading(
    @Args('createEnergyReadingInput')
    createEnergyReadingInput: CreateEnergyReadingInput,
  ) {
    return this.energyReadingService.create(createEnergyReadingInput)
  }

  @Mutation(() => EnergyReading)
  async recordEnergyReading(
    @Args('buildingId') buildingId: string,
    @Args('meterType', { type: () => MeterType }) meterType: MeterType,
    @Args('value') value: number,
    @Args('unit') unit: string,
    @Args('recordedById') recordedById: string,
  ): Promise<EnergyReading> {
    return await this.energyReadingService.create({
      buildingId,
      meterType,
      value,
      recordedById,
      recordedAt: new Date(),
    })
  }

  @Query(() => [EnergyReading], { name: 'energyReadings' })
  findAll() {
    return this.energyReadingService.findAll()
  }

  @Query(() => EnergyReading, { name: 'energyReadingById' })
  findOne(@Args('readingId', { type: () => String }) readingId: string) {
    return this.energyReadingService.findOne(readingId)
  }

  // @Mutation(() => EnergyReading)
  // updateEnergyReading(
  //   @Args('updateEnergyReadingInput')
  //   updateEnergyReadingInput: UpdateEnergyReadingInput,
  // ) {
  //   return this.energyReadingService.update(
  //     updateEnergyReadingInput.id,
  //     updateEnergyReadingInput,
  //   )
  // }

  @Mutation(() => EnergyReading)
  removeEnergyReading(
    @Args('readingId', { type: () => String }) readingId: string,
  ) {
    return this.energyReadingService.remove(readingId)
  }

  @ResolveField(() => User, { nullable: true })
  async recordedBy(@Parent() reading: EnergyReading): Promise<User | null> {
    console.log('Resolving recordedBy for reading', reading._id)

    if (!reading.recordedById) return null
    return this.userService.findOne(reading.recordedById)
  }
}
