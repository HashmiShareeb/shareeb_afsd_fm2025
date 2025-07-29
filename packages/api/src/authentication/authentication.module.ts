import { Module } from '@nestjs/common'
import { FirebaseService } from './services/firebase.service'
import { PassportModule } from '@nestjs/passport'
import { FirebaseAuthStrategy } from './firebase.auth.strategy'

@Module({
  imports: [PassportModule],
  providers: [FirebaseAuthStrategy, FirebaseService],
})
export class AuthenticationModule {}
