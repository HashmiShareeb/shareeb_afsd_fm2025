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

  // create(createRoomInput: CreateRoomInput) {
  //   const room = new Room()
  //   room.name = createRoomInput.name
  //   room.buildingId = createRoomInput.buildingId
  //   room.floor = createRoomInput.floor
  //   room.capacity = createRoomInput.capacity

  //   return this.roomRepository.save(room)
  // }

  async create(createRoomInput: CreateRoomInput): Promise<Room> {
    const room = this.roomRepository.create({
      ...createRoomInput,
      buildingId: createRoomInput.buildingId.toString(), // Ensure buildingId is a string
    })
    console.log('Creating room with buildingId:', createRoomInput.buildingId) // check if buildingId is passed correctly
    const savedRoom = await this.roomRepository.save(room)
    console.log('Saved room:', savedRoom) // save room
    return savedRoom
  }

  // async findByBuildingId(buildingId: string): Promise<Room[]> {
  //   return this.roomRepository.find({ where: { buildingId } })
  // }

  async findByBuildingId(buildingId: string): Promise<Room[]> {
    console.log('Querying rooms with buildingId:', buildingId) // Debug
    const rooms = await this.roomRepository.find({ where: { buildingId } })
    console.log('Rooms found:', rooms) // Debug
    return rooms
  }

  findAll() {
    return `This action returns all room`
  }

  findOne(roomId: string) {
    return this.roomRepository.findOne({ where: { _id: roomId } })
  }

  // update(id: number, updateRoomInput: UpdateRoomInput) {
  //   return `This action updates a #${id} room`
  // }

  remove(id: number) {
    return `This action removes a #${id} room`
  }
}
