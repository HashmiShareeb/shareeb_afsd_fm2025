import { forwardRef, Module } from '@nestjs/common'
import { BuildingService } from './building.service'
import { BuildingResolver } from './building.resolver'
import { Building } from './entities/building.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RoomModule } from 'src/room/room.module'

@Module({
  providers: [BuildingResolver, BuildingService],
  imports: [TypeOrmModule.forFeature([Building]), forwardRef(() => RoomModule)], // Inject repo in the module of entity
  exports: [BuildingService], //export the buildingservice into the module so it can be used in other modules
})
export class BuildingModule {}
