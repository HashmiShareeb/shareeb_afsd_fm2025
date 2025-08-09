import { Injectable } from '@nestjs/common'
// import { CreateSpecialrequestInput } from './dto/create-specialrequest.input'
// import { UpdateSpecialrequestInput } from './dto/update-specialrequest.input'

@Injectable()
export class SpecialrequestService {
  // create(createSpecialrequestInput: CreateSpecialrequestInput) {
  //   return 'This action adds a new specialrequest'
  // }

  findAll() {
    return `This action returns all specialrequest`
  }

  findOne(id: number) {
    return `This action returns a #${id} specialrequest`
  }

  // update(id: number, updateSpecialrequestInput: UpdateSpecialrequestInput) {
  //   return `This action updates a #${id} specialrequest`
  // }

  remove(id: number) {
    return `This action removes a #${id} specialrequest`
  }
}
