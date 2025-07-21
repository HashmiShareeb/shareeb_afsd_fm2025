import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { BuildingService } from './building.service'
import { Building } from './entities/building.entity'
// import { CreateBuildingInput } from './dto/create-building.input'
// import { UpdateBuildingInput } from './dto/update-building.input'

@Resolver(() => Building)
export class BuildingResolver {
  constructor(private readonly buildingService: BuildingService) {}

  //test query for building
  @Query(() => [Building], { name: 'buildings' })
  findAll() {
    return [
      {
        id: '1',
        name: 'Building One',
        address: '123 Main St',
      },
      {
        id: '2',
        name: 'Building Two',
        address: '456 Elm St',
      },
    ]
  }

  // @Mutation(() => Building)
  // createBuilding(
  //   @Args('createBuildingInput') createBuildingInput: CreateBuildingInput,
  // ) {
  //   return this.buildingService.create(createBuildingInput)
  // }

  @Query(() => Building, { name: 'building' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.buildingService.findOne(id)
  }

  // @Mutation(() => Building)
  // updateBuilding(
  //   @Args('updateBuildingInput') updateBuildingInput: UpdateBuildingInput,
  // ) {
  //   return this.buildingService.update(
  //     updateBuildingInput.id,
  //     updateBuildingInput,
  //   )
  // }

  @Mutation(() => Building)
  removeBuilding(@Args('id', { type: () => Int }) id: number) {
    return this.buildingService.remove(id)
  }
}
