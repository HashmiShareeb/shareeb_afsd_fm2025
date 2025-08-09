import { Injectable } from '@nestjs/common'
// import { CreateRoundRoomInput } from './dto/create-round-room.input';
// import { UpdateRoundRoomInput } from './dto/update-round-room.input';

@Injectable()
export class RoundRoomService {
  // create(createRoundRoomInput: CreateRoundRoomInput) {
  //   return 'This action adds a new roundRoom';
  // }

  findAll() {
    return `This action returns all roundRoom`
  }

  findOne(id: number) {
    return `This action returns a #${id} roundRoom`
  }

  // update(id: number, updateRoundRoomInput: UpdateRoundRoomInput) {
  //   return `This action updates a #${id} roundRoom`;
  // }

  remove(id: number) {
    return `This action removes a #${id} roundRoom`
  }
}
