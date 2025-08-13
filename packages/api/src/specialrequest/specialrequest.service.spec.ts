import { Test, TestingModule } from '@nestjs/testing'
import { SpecialrequestService } from './specialrequest.service'

describe('SpecialrequestService', () => {
  let service: SpecialrequestService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpecialrequestService],
    }).compile()

    service = module.get<SpecialrequestService>(SpecialrequestService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
