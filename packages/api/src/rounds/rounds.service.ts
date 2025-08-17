import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Round, RoundStatus } from './entities/round.entity'
import { MongoRepository } from 'typeorm'
import { ObjectId } from 'mongodb'
import { CreateRoundInput } from './dto/create-round.input'
import { Role, User } from 'src/user/entities/user.entity'
import {
  Checklistitem,
  ChecklistItemStatus,
} from 'src/checklistitem/entities/checklistitem.entity'
import { RoundRoomStatus } from 'src/round-room/entities/round-room.entity'

// import { UpdateRoundInput } from './dto/update-round.input';

@Injectable()
export class RoundsService {
  constructor(
    @InjectRepository(Round)
    private readonly roundRepository: MongoRepository<Round>,
    @InjectRepository(User)
    private readonly userRepository: MongoRepository<User>,
  ) {}

  async create(createRoundInput: CreateRoundInput): Promise<Round> {
    const user = await this.userRepository.findOneBy({
      _id: new ObjectId(createRoundInput.assignedToId),
    })

    console.log('User found:', user)

    if (!user || user.role !== Role.MANAGER) {
      throw new Error('Can only assign rounds to users with MANAGER role')
    }

    // Create RoundRoom objects with proper structure
    const roundRooms = createRoundInput.rooms.map(roomInput => ({
      roundRoomId: new ObjectId().toString(), // Generate unique ID for each round room
      roomId: roomInput.roomId,
      order: roomInput.order,
      roundId: '', // This will be set after the round is created
      status: RoundRoomStatus.OPEN,
      checklist: [], // Initialize empty checklist
    }))

    const round = this.roundRepository.create({
      name: createRoundInput.name,
      assignedToId: createRoundInput.assignedToId,
      buildingId: createRoundInput.buildingId,
      startTime: new Date().toISOString(),
      status: RoundStatus.PLANNED,
      rooms: roundRooms,
    })

    // Update roundId for each room after the round is created
    const savedRound = await this.roundRepository.save(round)
    savedRound.rooms.forEach(room => {
      room.roundId = savedRound.roundId
    })

    return this.roundRepository.save(savedRound)
  }

  async addChecklistItem(
    roundId: string,
    roundRoomId: string,
    label: string,
    notes?: string,
  ): Promise<Checklistitem> {
    const round = await this.roundRepository.findOne({
      where: { _id: new ObjectId(roundId) }, // Fix: Convert string to ObjectId
    })

    if (!round) throw new Error('Round not found')

    const roundRoom = round.rooms.find(rr => rr.roundRoomId === roundRoomId)
    if (!roundRoom) throw new Error('RoundRoom not found')

    const newItem: Checklistitem = {
      _id: new ObjectId().toString(),
      label,
      status: ChecklistItemStatus.NOT_CHECKED,
      notes,
      itemId: new ObjectId().toString(),
    }

    roundRoom.checklist.push(newItem)

    round.rooms = [...round.rooms]

    await this.roundRepository.save(round)

    return newItem
  }

  async updateChecklistItem(
    roundId: string,
    roundRoomId: string,
    itemId: string,
    status: ChecklistItemStatus,
  ): Promise<Checklistitem> {
    const round = await this.roundRepository.findOne({
      where: { _id: new ObjectId(roundId) },
    })
    if (!round) throw new Error('Round not found')

    const room = round.rooms.find(r => r.roundRoomId === roundRoomId)
    if (!room) throw new Error('Room not found')

    const item = room.checklist.find(i => i.itemId === itemId)
    if (!item) throw new Error('Item not found')

    item.status = status

    const allChecked = room.checklist.every(
      i =>
        i.status === ChecklistItemStatus.OK ||
        i.status === ChecklistItemStatus.PROBLEM,
    )
    room.status = allChecked
      ? RoundRoomStatus.COMPLETED
      : RoundRoomStatus.IN_PROGRESS

    const allRoomsCompleted = round.rooms.every(
      r => r.status === RoundRoomStatus.COMPLETED,
    )
    round.status = allRoomsCompleted
      ? RoundStatus.COMPLETED
      : RoundStatus.IN_PROGRESS

    round.rooms = [...round.rooms] // force dirty flag
    await this.roundRepository.save(round)

    return item
  }

  async myRounds(userId: string): Promise<Round[]> {
    const rounds = await this.roundRepository.find({
      where: { assignedToId: userId },
    })

    // ── guarantee an empty array instead of null ──
    rounds.forEach(r =>
      r.rooms.forEach(room => {
        room.roundRoomId = room.roundRoomId ?? new ObjectId().toString()
        room.checklist = room.checklist ?? []
        room.status = room.status ?? RoundRoomStatus.OPEN
      }),
    )

    return rounds
  }

  async findAll(): Promise<Round[]> {
    return this.roundRepository.find()
  }

  findOne(roundId: string) {
    return `This action returns a #${roundId} round`
  }

  findByUser(userId: string): Promise<Round[]> {
    return this.roundRepository.find({
      where: { assignedToId: userId },
    })
  }

  // update(id: number, updateRoundInput: UpdateRoundInput) {
  //   return `This action updates a #${id} round`;
  // }

  remove(roundId: string) {
    return `This action removes a #${roundId} round`
  }

  assignToUser(roundId: string, userId: string) {
    // Logic to assign the round to a user
    return `Round with ID ${roundId} assigned to user with ID ${userId}`
  }

  //seeding

  async saveAll(rounds: Round[]): Promise<Round[]> {
    return this.roundRepository.save(rounds)
  }

  truncate(): Promise<void> {
    return this.roundRepository.clear()
  }
}
