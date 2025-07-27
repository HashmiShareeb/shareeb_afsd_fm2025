import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Room } from './entities/room.entity'
import { MongoRepository } from 'typeorm'
import { CreateRoomInput } from './dto/create-room.input'
// import { UpdateRoomInput } from './dto/update-room.input'

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private readonly roomRepository: MongoRepository<Room>,

    // private readonly buildingsService: BuildingService, // Injecting BuildingService to access building-related logic
  ) {}

  create(createRoomInput: CreateRoomInput) {
    const room = new Room()
    room.name = createRoomInput.name
    // room.buildingId = createRoomInput.buildingId
    room.floor = createRoomInput.floor
    room.capacity = createRoomInput.capacity

    return this.roomRepository.save(room)
  }

  findAll() {
    return `This action returns all room`
  }

  findOne(id: number) {
    return `This action returns a #${id} room`
  }

  findByBuildingId(buildingId: string): Promise<Room[]> {
    // Logic to find rooms by buildingId
    return this.roomRepository.find({ where: { buildingId } })
  }

  // update(id: number, updateRoomInput: UpdateRoomInput) {
  //   return `This action updates a #${id} room`
  // }

  remove(id: number) {
    return `This action removes a #${id} room`
  }
}
