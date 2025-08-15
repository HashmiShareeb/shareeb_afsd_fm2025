import { Module } from '@nestjs/common'
import { EnergyReadingService } from './energy-reading.service'
import { EnergyReadingResolver } from './energy-reading.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { EnergyReading } from './entities/energy-reading.entity'
import { UserModule } from 'src/user/user.module'
import { BuildingModule } from 'src/building/building.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([EnergyReading]),
    UserModule,
    BuildingModule,
  ],
  providers: [EnergyReadingResolver, EnergyReadingService],
})
export class EnergyReadingModule {}
