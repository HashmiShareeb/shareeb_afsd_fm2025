import { Test, TestingModule } from '@nestjs/testing'
import { EnergyReadingService } from './energy-reading.service'

describe('EnergyReadingService', () => {
  let service: EnergyReadingService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EnergyReadingService],
    }).compile()

    service = module.get<EnergyReadingService>(EnergyReadingService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
