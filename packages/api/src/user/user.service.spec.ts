import { Test, TestingModule } from '@nestjs/testing'
import { UserService } from './user.service'
import { getRepositoryToken } from '@nestjs/typeorm'
import { User } from './entities/user.entity'
import { MongoRepository } from 'typeorm'

describe('UserService', () => {
  let service: UserService
  let mockUserRepository: Partial<MongoRepository<User>>

  beforeEach(async () => {
    mockUserRepository = {
      findOneBy: jest.fn(),
      save: jest.fn(),
      update: jest.fn(),
      find: jest.fn(),
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile()

    service = module.get<UserService>(UserService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should find user by firebase uid', async () => {
    const uid = 'test-uid'
    const mockUser = { id: '1', uid, name: 'Test User' } as User

    jest.spyOn(mockUserRepository, 'findOneBy').mockResolvedValue(mockUser)

    const result = await service.findOneByFirebaseUid(uid)
    expect(result).toEqual(mockUser)
    expect(mockUserRepository.findOneBy).toHaveBeenCalledWith({
      where: { uid },
    })
  })
})
