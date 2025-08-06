import { Injectable } from '@nestjs/common'
// import { CreateRoundInput } from './dto/create-round.input';
// import { UpdateRoundInput } from './dto/update-round.input';

@Injectable()
export class RoundsService {
  // create(createRoundInput: CreateRoundInput) {
  //   return 'This action adds a new round';
  // }

  findAll() {
    return `This action returns all rounds`
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
