import { Test, TestingModule } from '@nestjs/testing'
import { MaintenancereportService } from './maintenancereport.service'

describe('MaintenancereportService', () => {
  let service: MaintenancereportService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MaintenancereportService],
    }).compile()

    service = module.get<MaintenancereportService>(MaintenancereportService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
