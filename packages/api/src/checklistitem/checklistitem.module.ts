import { Module } from '@nestjs/common'
import { ChecklistitemService } from './checklistitem.service'
import { ChecklistitemResolver } from './checklistitem.resolver'

@Module({
  providers: [ChecklistitemResolver, ChecklistitemService],
})
export class ChecklistitemModule {}
