import { Module } from '@nestjs/common'
import { MaintenancereportService } from './maintenancereport.service'
import { MaintenancereportResolver } from './maintenancereport.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Maintenancereport } from './entities/maintenancereport.entity'
import { UserModule } from 'src/user/user.module'
import { RoomModule } from 'src/room/room.module'
import { BuildingModule } from 'src/building/building.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([Maintenancereport]),
    UserModule,
    RoomModule,
    BuildingModule,
  ],
  providers: [MaintenancereportResolver, MaintenancereportService],
})
export class MaintenancereportModule {}
