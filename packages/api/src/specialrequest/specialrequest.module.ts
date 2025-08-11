import { Module } from '@nestjs/common'
import { SpecialrequestService } from './specialrequest.service'
import { SpecialrequestResolver } from './specialrequest.resolver'

import { TypeOrmModule } from '@nestjs/typeorm'
import { UserModule } from 'src/user/user.module'
import { Specialrequest } from './entities/specialrequest.entity'
import { RoomModule } from 'src/room/room.module'
import { BuildingModule } from 'src/building/building.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([Specialrequest]),
    UserModule,
    RoomModule,
    BuildingModule,
  ],
  providers: [SpecialrequestResolver, SpecialrequestService],
})
export class SpecialrequestModule {}
