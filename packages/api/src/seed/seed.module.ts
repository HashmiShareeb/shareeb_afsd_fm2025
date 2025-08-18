import { Module } from '@nestjs/common'
import { BuildingModule } from 'src/building/building.module'
import { CommandModule } from 'nestjs-command'
import { SeedService } from './seed.service'
import { DatabaseSeedCommand } from './seed.command'
import { UserModule } from 'src/user/user.module'
import { EnergyReadingModule } from 'src/energy-reading/energy-reading.module'

@Module({
  imports: [
    EnergyReadingModule,
    UserModule,
    BuildingModule, // Import the BuildingModule to seed buildings
    CommandModule, // Import the CommandModule to seed commands
  ],
  providers: [DatabaseSeedCommand, SeedService],
})
export class SeedModule {}
