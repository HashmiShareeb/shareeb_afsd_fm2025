import { forwardRef, Module } from '@nestjs/common'
import { RoomService } from './room.service'
import { RoomResolver } from './room.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Room } from './entities/room.entity'
import { BuildingModule } from 'src/building/building.module'

@Module({
  imports: [TypeOrmModule.forFeature([Room]), forwardRef(() => BuildingModule)],
  providers: [RoomResolver, RoomService],
  exports: [RoomService],
})
export class RoomModule {}
