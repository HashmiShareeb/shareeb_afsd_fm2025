import { Injectable } from '@nestjs/common'

import { BuildingService } from 'src/building/building.service'
// import { Building } from 'src/building/entities/building.entity'

// import * as buildings from './data/buildings.json'

@Injectable()
export class SeedService {
  constructor(private buildingService: BuildingService) {}
}
