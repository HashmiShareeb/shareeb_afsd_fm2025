import { Test, TestingModule } from '@nestjs/testing'
import { RoundRoomService } from './round-room.service'

describe('RoundRoomService', () => {
  let service: RoundRoomService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoundRoomService],
    }).compile()

    service = module.get<RoundRoomService>(RoundRoomService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
