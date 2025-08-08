import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Round, RoundStatus } from './entities/round.entity'
import { MongoRepository } from 'typeorm'
import { ObjectId } from 'mongodb'
import { CreateRoundInput } from './dto/create-round.input'
import { Role, User } from 'src/user/entities/user.entity'
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

    const round = this.roundRepository.create({
      ...createRoundInput,
      startTime: new Date().toISOString(),
      status: RoundStatus.PLANNED,
      rooms: createRoundInput.rooms ?? [],
    })
    return this.roundRepository.save(round)
  }

  // async create(
  //   createRoundInput: CreateRoundInput,
  //   firebaseUid: string,
  // ): Promise<Round> {
  //   const user = await this.userRepository.findOne({
  //     where: { uid: firebaseUid },
  //   })

  //   const round = this.roundRepository.create({
  //     ...createRoundInput,
  //     startTime: new Date().toISOString(),
  //     status: createRoundInput.status || RoundStatus.PLANNED,
  //     assignedToId: firebaseUid, // Store Firebase UID
  //     rooms: createRoundInput.rooms,
  //   })
  //   return this.roundRepository.save(round)
  // }

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
