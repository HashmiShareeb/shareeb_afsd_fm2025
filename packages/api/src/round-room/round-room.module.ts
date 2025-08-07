import { Module } from '@nestjs/common'
import { RoundRoomService } from './round-room.service'
import { RoundRoomResolver } from './round-room.resolver'

@Module({
  providers: [RoundRoomResolver, RoundRoomService],
})
export class RoundRoomModule {}
