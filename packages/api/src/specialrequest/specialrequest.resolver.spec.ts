import { Test, TestingModule } from '@nestjs/testing'
import { SpecialrequestResolver } from './specialrequest.resolver'
import { SpecialrequestService } from './specialrequest.service'

describe('SpecialrequestResolver', () => {
  let resolver: SpecialrequestResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpecialrequestResolver, SpecialrequestService],
    }).compile()

    resolver = module.get<SpecialrequestResolver>(SpecialrequestResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
