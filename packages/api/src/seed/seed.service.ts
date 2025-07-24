import { Injectable } from '@nestjs/common'

import { BuildingService } from 'src/building/building.service'
import { Building } from 'src/building/entities/building.entity'

import * as buildings from './data/buildings.json'

@Injectable()
export class SeedService {
  constructor(private buildingService: BuildingService) {}

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
}
