import { Test, TestingModule } from '@nestjs/testing'
import { MaintenancereportResolver } from './maintenancereport.resolver'
import { MaintenancereportService } from './maintenancereport.service'

describe('MaintenancereportResolver', () => {
  let resolver: MaintenancereportResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MaintenancereportResolver, MaintenancereportService],
    }).compile()

    resolver = module.get<MaintenancereportResolver>(MaintenancereportResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
