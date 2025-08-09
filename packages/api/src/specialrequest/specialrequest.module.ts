import { Module } from '@nestjs/common'
import { SpecialrequestService } from './specialrequest.service'
import { SpecialrequestResolver } from './specialrequest.resolver'

@Module({
  providers: [SpecialrequestResolver, SpecialrequestService],
})
export class SpecialrequestModule {}
