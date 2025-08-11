import { Injectable } from '@nestjs/common'
import {
  Specialrequest,
  SpecialRequestStatus,
} from './entities/specialrequest.entity'
import { MongoRepository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { CreateSpecialrequestInput } from './dto/create-specialrequest.input'
// import { UpdateSpecialrequestInput } from './dto/update-specialrequest.input'

@Injectable()
export class SpecialrequestService {
  constructor(
    @InjectRepository(Specialrequest)
    private specialrequestRepository: MongoRepository<Specialrequest>,
  ) {}

  create(
    createSpecialrequestInput: CreateSpecialrequestInput,
  ): Promise<Specialrequest> {
    const specialRequest = this.specialrequestRepository.create({
      ...createSpecialrequestInput,
      status: SpecialRequestStatus.PENDING,
      requestedAt: new Date(),
    })
    return this.specialrequestRepository.save(specialRequest)
  }

  findAll(): Promise<Specialrequest[]> {
    return this.specialrequestRepository.find()
  }

  findByUser(userId: string): Promise<Specialrequest[]> {
    return this.specialrequestRepository.find({
      where: { requestedById: userId },
    })
  }

  findOne(requestId: string) {
    return this.specialrequestRepository.findOne({ where: { _id: requestId } })
  }

  // update(id: number, updateSpecialrequestInput: UpdateSpecialrequestInput) {
  //   return `This action updates a #${id} specialrequest`
  // }

  // updateStatus(requestId: string, status: string): Promise<Specialrequest> {
  //   return this.specialrequestRepository.save({ requestId, status })
  // }

  remove(requestId: string) {
    return this.specialrequestRepository.delete({ _id: requestId })
  }
}
