import { Injectable } from '@nestjs/common'
import { SeedService } from './seed.service'
import { Command } from 'nestjs-command'

@Injectable()
export class DatabaseSeedCommand {
  constructor(private readonly seedService: SeedService) {}

  //   * Buildings
  @Command({
    command: 'seed:database:buildings',
    describe: 'Seed the database with buildings from JSON',
  })
  async seedBuildings() {
    console.info('🏢 Start seeding of buildings')
    const building = await this.seedService.addBuildingsFromJson()
    console.info(`🏢 ${building.length} buildings added`)
  }

  //   * Reset Buildings
  @Command({
    command: 'seed:reset:buildings',
    describe: 'Delete all data from the travelers json',
  })
  async deleteBuilding() {
    console.info('🏢 Start removal of buildings')
    await this.seedService.deleteAllBuildings()
    console.info('🏢 Removed buildings')
  }

  // * Energy Readings
  @Command({
    command: 'seed:database:energyReadings',
    describe: 'Seed the database with energy readings from JSON',
  })
  async seedEnergyReadings() {
    console.info('🔋 Start seeding of energy readings')
    const readings = await this.seedService.addEnergyReadingsFromJson()
    console.info(`🔋 ${readings.length} energy readings added`)
  }

  //   * Reset Energy Readings
  @Command({
    command: 'seed:reset:energyReadings',
    describe: 'Delete all data from the energy readings',
  })
  async deleteEnergyReadings() {
    console.info('🔋 Start removal of energy readings')
    await this.seedService.deleteAllEnergyReadings()
    console.info('🔋 Removed energy readings')
  }
}
