import { Module } from '@nestjs/common'
import { RoundsService } from './rounds.service'
import { RoundsResolver } from './rounds.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Round } from './entities/round.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Round])],
  providers: [RoundsResolver, RoundsService],
  exports: [RoundsService],
})
export class RoundsModule {}
