import { Test, TestingModule } from '@nestjs/testing'
import { RoundRoomResolver } from './round-room.resolver'
import { RoundRoomService } from './round-room.service'

describe('RoundRoomResolver', () => {
  let resolver: RoundRoomResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoundRoomResolver, RoundRoomService],
    }).compile()

    resolver = module.get<RoundRoomResolver>(RoundRoomResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
