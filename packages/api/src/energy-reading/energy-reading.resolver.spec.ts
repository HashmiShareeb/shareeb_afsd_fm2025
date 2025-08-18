import { Test, TestingModule } from '@nestjs/testing'
import { EnergyReadingResolver } from './energy-reading.resolver'
import { EnergyReadingService } from './energy-reading.service'

describe('EnergyReadingResolver', () => {
  let resolver: EnergyReadingResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EnergyReadingResolver, EnergyReadingService],
    }).compile()

    resolver = module.get<EnergyReadingResolver>(EnergyReadingResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
