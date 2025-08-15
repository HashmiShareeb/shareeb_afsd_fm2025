import { Test, TestingModule } from '@nestjs/testing'
import { ChecklistitemResolver } from './checklistitem.resolver'
import { ChecklistitemService } from './checklistitem.service'

describe('ChecklistitemResolver', () => {
  let resolver: ChecklistitemResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChecklistitemResolver, ChecklistitemService],
    }).compile()

    resolver = module.get<ChecklistitemResolver>(ChecklistitemResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
