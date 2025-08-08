import { Module } from '@nestjs/common'
import { RoundsService } from './rounds.service'
import { RoundsResolver } from './rounds.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Round } from './entities/round.entity'
import { UserModule } from 'src/user/user.module'
import { User } from 'src/user/entities/user.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Round, User]), UserModule],
  providers: [RoundsResolver, RoundsService],
  exports: [RoundsService],
})
export class RoundsModule {}
