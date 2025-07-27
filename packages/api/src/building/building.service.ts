import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Building } from './entities/building.entity'
import { MongoRepository } from 'typeorm'
import { ObjectId } from 'mongodb'

import { CreateBuildingInput } from './dto/create-building.input'
import { RoomService } from 'src/room/room.service'
import { CreateRoomInput } from 'src/room/dto/create-room.input'
import { Room } from 'src/room/entities/room.entity'
// import { UpdateBuildingInput } from './dto/update-building.input'

@Injectable()
export class BuildingService {
  constructor(
    @InjectRepository(Building)
    //use mongodb repo
    private readonly buildingRepository: MongoRepository<Building>,

    @Inject(forwardRef(() => RoomService)) // ✅ fix circular dependency
    private readonly roomService: RoomService,
  ) {}

  findAll() {
    return this.buildingRepository.find()
  }

  create(createBuildingInput: CreateBuildingInput): Promise<Building> {
    const building = new Building()
    building.name = createBuildingInput.name
    building.address = createBuildingInput.address
    building.type = createBuildingInput.type
    building.description = createBuildingInput.description

    return this.buildingRepository.save(building)
  }

  // async addRoomToBuilding(
  //   buildingId: string,
  //   createRoomInput: CreateRoomInput,
  // ): Promise<Room> {
  //   // Verify building exists
  //   const building = await this.findOne(buildingId)
  //   if (!building) {
  //     throw new NotFoundException(`Building with ID ${buildingId} not found`)
  //   }
  //   // Create room with buildingId
  //   return this.roomService.create({ ...createRoomInput, buildingId })
  // }

  // async addRoomToBuilding(
  //   buildingId: string,
  //   createRoomInput: CreateRoomInput,
  // ): Promise<Room> {
  //   const building = await this.findOne(buildingId)
  //   if (!building) {
  //     throw new NotFoundException(`Building with ID ${buildingId} not found`)
  //   }
  //   console.log('Adding room to buildingId:', buildingId) // Debug
  //   return this.roomService.create({ ...createRoomInput, buildingId })
  // }
  async addRoomToBuilding(
    buildingId: string,
    createRoomInput: CreateRoomInput,
  ): Promise<Room> {
    const building = await this.findOne(buildingId)
    if (!building) {
      throw new NotFoundException(`Building with ID ${buildingId} not found`)
    }
    // Create room with buildingId
    console.log('Adding room to buildingId:', buildingId) // Debug
    const room = await this.roomService.create({
      ...createRoomInput,
      buildingId,
    })
    console.log('Created room:', room) // Debug
    return room
  }

  findOne(buildingId: string) {
    // EXTRA STEP check if id is a valid ObjectId
    if (!ObjectId.isValid(buildingId)) throw new Error('Invalid ObjectId')

    const objID = new ObjectId(buildingId) // From mongodb package !!!
    return this.buildingRepository.findOneByOrFail({ _id: objID }) // use the _id field to find the object (that is the default field name for the id in mongodb)
  }

  // update(id: number, updateBuildingInput: UpdateBuildingInput) {
  //   return `This action updates a #${id} building`
  // }

  saveAll(buildings: Building[]): Promise<Building[]> {
    return this.buildingRepository.save(buildings)
  }

  truncate(): Promise<void> {
    return this.buildingRepository.clear()
  }
  remove(id: number) {
    return `This action removes a #${id} building`
  }

  // extra - logic

  async findByName(name: string): Promise<Building | null> {
    return this.buildingRepository.findOne({ where: { name } })
  }

  async findByAddress(address: string): Promise<Building[]> {
    return this.buildingRepository.find({ where: { address } })
  }

  async countBuildings(): Promise<number> {
    return this.buildingRepository.count()
  }

  async existsByName(name: string): Promise<boolean> {
    const count = await this.buildingRepository.count({ where: { name } })
    return count > 0
  }

  async existsByType(type: string): Promise<boolean> {
    const count = await this.buildingRepository.count({ where: { type } })
    return count > 0
  }
}
