import { Injectable } from '@nestjs/common'

import { BuildingService } from 'src/building/building.service'
import { Building } from 'src/building/entities/building.entity'

import * as buildings from './data/buildings.json'

import { UserService } from 'src/user/user.service'
import {
  EnergyReading,
  MeterType,
} from 'src/energy-reading/entities/energy-reading.entity'
import { EnergyReadingService } from 'src/energy-reading/energy-reading.service'

import * as energyReadings from './data/energyReadings.json'

@Injectable()
export class SeedService {
  constructor(
    private buildingService: BuildingService,
    // private roundsService: RoundsService,
    private userService: UserService,
    private energyService: EnergyReadingService,
  ) {}

  async addBuildingsFromJson(): Promise<Building[]> {
    const theBuildings: Building[] = []
    for (const building of buildings) {
      const b = new Building()
      b.name = building.name
      b.address = building.address
      b.type = building.type
      b.description = building.description
      // Add other properties as needed

      theBuildings.push(await this.buildingService.create(b))
    }

    return this.buildingService.saveAll(theBuildings)
  }

  async deleteAllBuildings(): Promise<void> {
    return this.buildingService.truncate()
  }

  //**ENERGY READINGS */

  async addEnergyReadingsFromJson(): Promise<EnergyReading[]> {
    const theEr: EnergyReading[] = []
    for (const energyReading of energyReadings) {
      const er = new EnergyReading()
      er.meterType = energyReading.meterType as MeterType
      er.value = energyReading.value
      er.unit = energyReading.unit
      const foundBuilding = await this.buildingService.findByName(
        energyReading.building.name,
      )
      er.building = foundBuilding === null ? undefined : foundBuilding
      const recordedByUser = await this.userService.findOneByFirebaseUid(
        energyReading.recordedBy.name,
      )
      er.recordedBy = recordedByUser === null ? undefined : recordedByUser
      theEr.push(er)
    }

    return this.energyService.saveAll(theEr)
  }

  async deleteAllEnergyReadings(): Promise<void> {
    return this.energyService.truncate()
  }
}
