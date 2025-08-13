import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { MongoRepository } from 'typeorm'
import {
  Checklistitem,
  ChecklistItemStatus,
} from './entities/checklistitem.entity'
import { Round } from 'src/rounds/entities/round.entity'
import { CreateChecklistitemInput } from './dto/create-checklistitem.input'
import { UpdateChecklistitemInput } from './dto/update-checklistitem.input'

@Injectable()
export class ChecklistitemService {
  constructor(
    @InjectRepository(Checklistitem)
    // private readonly checklistitemRepository: MongoRepository<Checklistitem>,
    private readonly roundRepository: MongoRepository<Round>,
  ) {}

  findAll() {
    return this.roundRepository.find()
  }

  findOne(itemId: string) {
    return this.roundRepository.findOneBy({ id: itemId })
  }

  async update(
    roundId: string,
    roundRoomId: string,
    input: UpdateChecklistitemInput,
  ) {
    const round = await this.roundRepository.findOne({
      where: { _id: roundId },
    })
    if (!round) throw new NotFoundException('Round not found')

    const room = round.rooms.find(r => r.roundRoomId === roundRoomId)
    if (!room) throw new NotFoundException('Room not found in this round')

    const item = room.checklist.find(i => i.itemId === input.itemId)
    if (!item) throw new NotFoundException('Checklist item not found')

    item.status = input.status
    item.notes = input.notes

    await this.roundRepository.save(round)
    return item
  }

  async create(
    roundId: string,
    roundRoomId: string,
    input: CreateChecklistitemInput,
  ) {
    const round = await this.roundRepository.findOne({
      where: { _id: roundId },
    })
    if (!round) throw new NotFoundException('Round not found')

    const room = round.rooms.find(r => r.roundRoomId === roundRoomId)
    if (!room) throw new NotFoundException('Room not found in this round')

    const newItem: Checklistitem = {
      _id: '',
      itemId: '',
      label: input.label,
      status: input.status || ChecklistItemStatus.NOT_CHECKED,
      notes: input.notes || undefined,
    }

    room.checklist.push(newItem)
    await this.roundRepository.save(round)
    return newItem
  }

  remove(itemId: string) {
    return `This action removes a #${itemId} checklistitem`
  }
}
