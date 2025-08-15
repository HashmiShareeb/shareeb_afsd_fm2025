import { Module } from '@nestjs/common'
import { EnergyReadingService } from './energy-reading.service'
import { EnergyReadingResolver } from './energy-reading.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { EnergyReading } from './entities/energy-reading.entity'
import { UserModule } from 'src/user/user.module'

@Module({
  imports: [TypeOrmModule.forFeature([EnergyReading]), UserModule],
  providers: [EnergyReadingResolver, EnergyReadingService],
})
export class EnergyReadingModule {}
