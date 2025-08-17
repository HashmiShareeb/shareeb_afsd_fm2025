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
import { Building } from 'src/building/entities/building.entity'
import { BuildingService } from 'src/building/building.service'

@Resolver(() => EnergyReading)
export class EnergyReadingResolver {
  constructor(
    private readonly energyReadingService: EnergyReadingService,
    private readonly userService: UserService,
    private readonly buildingService: BuildingService,
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

  @Query(() => [EnergyReading], { name: 'energyReadingsByUser' })
  findByUser(@Args('userId', { type: () => String }) userId: string) {
    return this.energyReadingService.findByUser(userId)
  }

  @Query(() => [EnergyReading], { name: 'energyReadingsByBuilding' })
  findByBuilding(
    @Args('buildingId', { type: () => String }) buildingId: string,
  ) {
    return this.energyReadingService.findByBuildingId(buildingId)
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

  @Mutation(() => EnergyReading, { nullable: true })
  async removeEnergyReading(
    @Args('readingId', { type: () => String }) readingId: string,
  ): Promise<EnergyReading | null> {
    return await this.energyReadingService.remove(readingId)
  }

  @ResolveField(() => User, { nullable: true })
  async recordedBy(@Parent() reading: EnergyReading): Promise<User | null> {
    console.log('Resolving recordedBy for reading', reading._id)

    if (!reading.recordedById) return null
    return this.userService.findOne(reading.recordedById)
  }

  @ResolveField(() => Building, { nullable: true })
  async building(@Parent() reading: EnergyReading): Promise<Building | null> {
    console.log('Resolving building for reading', reading._id)

    if (!reading.buildingId) return null
    return this.buildingService.findOne(reading.buildingId)
  }
}
