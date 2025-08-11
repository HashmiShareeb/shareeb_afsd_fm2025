import { Module } from '@nestjs/common'
import { SpecialrequestService } from './specialrequest.service'
import { SpecialrequestResolver } from './specialrequest.resolver'

import { TypeOrmModule } from '@nestjs/typeorm'
import { UserModule } from 'src/user/user.module'
import { Specialrequest } from './entities/specialrequest.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Specialrequest]), UserModule],
  providers: [SpecialrequestResolver, SpecialrequestService],
})
export class SpecialrequestModule {}
