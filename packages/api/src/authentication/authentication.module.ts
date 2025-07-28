import { Module } from '@nestjs/common'
import { FirebaseService } from './services/firebase.service'
import { PassportModule } from '@nestjs/passport'

@Module({
  imports: [PassportModule],
  providers: [FirebaseService],
})
export class AuthenticationModule {}
