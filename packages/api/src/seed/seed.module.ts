import { Module } from '@nestjs/common'
import { BuildingModule } from 'src/building/building.module'
import { CommandModule } from 'nestjs-command'
import { SeedService } from './seed.service'
import { DatabaseSeedCommand } from './seed.command'

@Module({
  imports: [
    BuildingModule, // Import the BuildingModule to seed buildings
    CommandModule, // Import the CommandModule to seed commands
  ],
  providers: [DatabaseSeedCommand, SeedService],
})
export class SeedModule {}
