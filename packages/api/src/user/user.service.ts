import { Injectable } from '@nestjs/common'
import { CreateUserInput } from './dto/create-user.input'
import { Role, User } from './entities/user.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { MongoRepository } from 'typeorm/repository/MongoRepository'
import { ObjectId } from 'mongodb'

// import { UpdateUserInput } from './dto/update-user.input'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: MongoRepository<User>,
  ) {}

  // create(createUserInput: CreateUserInput) {
  //   const user = this.userRepository.create(createUserInput)
  //   return this.userRepository.save(user)
  // }

  findOneByFirebaseUid(uid: string) {
    return this.userRepository.findOneBy({ where: { uid: uid } })
  }
  findAll() {
    return this.userRepository.find()
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({
      where: { _id: new ObjectId(id) },
    })
    return user
  }

  async create(createUserInput: CreateUserInput) {
    // If the user already exists, throw an error
    if (await this.findOneByFirebaseUid(createUserInput.uid)) {
      throw new Error(
        'User not authorized to create this user. A Firebase user is already connected to an account.',
      )
    }

    const newCustomUser = new User()
    // if (createUserInput.locale) {
    //   newCustomUser.locale = createUserInput.locale
    // }
    newCustomUser.role = Role.USER // This is a security feature. We only allow users to create users with the role "user"
    newCustomUser.uid = createUserInput.uid // Firebase UID is saved in the user entity
    return this.userRepository.save(newCustomUser)
  }

  // update(id: number, updateUserInput: UpdateUserInput) {
  //   return `This action updates a #${id} user`
  // }

  remove(id: number) {
    return `This action removes a #${id} user`
  }
}
