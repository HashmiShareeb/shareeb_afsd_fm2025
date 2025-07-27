import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql'
import { BuildingService } from './building.service'
import { Building } from './entities/building.entity'
import { CreateBuildingInput } from './dto/create-building.input'
import { Room } from 'src/room/entities/room.entity'
import { CreateRoomInput } from 'src/room/dto/create-room.input'
import { RoomService } from 'src/room/room.service'

// import { UpdateBuildingInput } from './dto/update-building.input'

@Resolver(() => Building)
export class BuildingResolver {
  constructor(
    private readonly buildingService: BuildingService,
    private roomService: RoomService,
  ) {}

  //test query for building
  @Query(() => [Building], { name: 'buildings' })
  findAll() {
    // return [
    //   {
    //     id: '1',
    //     name: 'Building One',
    //     address: '123 Main St',
    //   },
    //   {
    //     id: '2',
    //     name: 'Building Two',
    //     address: '456 Elm St',
    //   },
    // ]

    return this.buildingService.findAll()
  }

  @Mutation(() => Building, { description: 'Create a building using the DTO.' })
  createBuilding(
    @Args('createBuildingInput') createBuildingInput: CreateBuildingInput,
  ): Promise<Building> {
    return this.buildingService.create(createBuildingInput)
  }

  @Query(() => Building, { name: 'building' })
  findOne(
    @Args('buildingId', { type: () => String }) buildingId: string,
  ): Promise<Building> {
    return this.buildingService.findOne(buildingId)
  }

  @Mutation(() => Room)
  addRoomToBuilding(
    @Args('buildingId') buildingId: string,
    @Args('createRoomInput') createRoomInput: CreateRoomInput,
  ) {
    return this.buildingService.addRoomToBuilding(buildingId, createRoomInput)
  }

  @ResolveField(() => [Room], { name: 'rooms', nullable: true })
  async rooms(@Parent() building: Building): Promise<Room[]> {
    return this.roomService.findByBuildingId(building.buildingId)
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

  // Extra queries for building logic

  @Query(() => Building, { name: 'buildingByName', nullable: true })
  findByName(
    @Args('name', { type: () => String }) name: string,
  ): Promise<Building | null> {
    return this.buildingService.findByName(name)
  }

  @Query(() => [Building], { name: 'buildingsByAddress' })
  findByAddress(
    @Args('address', { type: () => String }) address: string,
  ): Promise<Building[]> {
    return this.buildingService.findByAddress(address)
  }

  @Query(() => Int, { name: 'buildingCount' })
  countBuildings(): Promise<number> {
    return this.buildingService.countBuildings()
  }

  @Query(() => Boolean, { name: 'buildingExistsByName' })
  existsByName(
    @Args('name', { type: () => String }) name: string,
  ): Promise<boolean> {
    return this.buildingService.existsByName(name)
  }
}
