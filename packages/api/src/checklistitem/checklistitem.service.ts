import { Injectable } from '@nestjs/common'
// import { CreateChecklistitemInput } from './dto/create-checklistitem.input'
// import { UpdateChecklistitemInput } from './dto/update-checklistitem.input'

@Injectable()
export class ChecklistitemService {
  // create(createChecklistitemInput: CreateChecklistitemInput) {
  //   return 'This action adds a new checklistitem'
  // }

  findAll() {
    return `This action returns all checklistitem`
  }

  findOne(id: number) {
    return `This action returns a #${id} checklistitem`
  }

  // update(id: number, updateChecklistitemInput: UpdateChecklistitemInput) {
  //   return `This action updates a #${id} checklistitem`
  // }

  remove(id: number) {
    return `This action removes a #${id} checklistitem`
  }
}
