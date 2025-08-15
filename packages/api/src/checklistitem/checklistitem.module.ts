import { Module } from '@nestjs/common'
import { ChecklistitemService } from './checklistitem.service'
import { ChecklistitemResolver } from './checklistitem.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Round } from 'src/rounds/entities/round.entity'
import { RoundRoomModule } from 'src/round-room/round-room.module'
import { RoundsModule } from 'src/rounds/rounds.module'
import { Checklistitem } from './entities/checklistitem.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([Round, Checklistitem]),
    RoundsModule,
    RoundRoomModule,
  ],
  providers: [ChecklistitemResolver, ChecklistitemService],
})
export class ChecklistitemModule {}
