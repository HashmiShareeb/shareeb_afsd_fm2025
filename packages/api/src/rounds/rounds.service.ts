import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Round, RoundStatus } from './entities/round.entity'
import { Repository } from 'typeorm'
import { CreateRoundInput } from './dto/create-round.input'
// import { UpdateRoundInput } from './dto/update-round.input';

@Injectable()
export class RoundsService {
  constructor(
    @InjectRepository(Round)
    private readonly roundRepository: Repository<Round>,
  ) {}

  async create(createRoundInput: CreateRoundInput): Promise<Round> {
    const round = this.roundRepository.create({
      ...createRoundInput,
      startTime: new Date().toISOString(),
      status: RoundStatus.PLANNED,
      rooms: createRoundInput.rooms,
    })
    return this.roundRepository.save(round)
  }

  async findAll(): Promise<Round[]> {
    return this.roundRepository.find()
  }

  findOne(roundId: string) {
    return `This action returns a #${roundId} round`
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
}
