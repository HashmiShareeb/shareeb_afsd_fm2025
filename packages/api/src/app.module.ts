import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { GraphQLModule } from '@nestjs/graphql'
import { BuildingModule } from './building/building.module'
import { RoomModule } from './room/room.module'
import { UserModule } from './user/user.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SeedModule } from './seed/seed.module'
import { AuthenticationModule } from './authentication/authentication.module'
import { ConfigModule } from '@nestjs/config'
import { RoundsModule } from './rounds/rounds.module'
import { RoundRoomModule } from './round-room/round-room.module'
import { SpecialrequestModule } from './specialrequest/specialrequest.module'
import { MaintenancereportModule } from './maintenancereport/maintenancereport.module'

@Module({
  imports: [
    ConfigModule.forRoot(), //!Zorg dat deze als eerste wordt geïmporteerd
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb://localhost:27027/api',
      entities: [__dirname + '/**/*.entity.{js,ts}'],
      synchronize: true, // Careful with this in production
      extra: {
        useNewUrlParser: true,
        // useUnifiedTopology: true, --> remove the stupid deprecated message
      },
    }),
    BuildingModule,
    RoomModule,
    UserModule,
    SeedModule,
    AuthenticationModule,
    RoundsModule,
    RoundRoomModule,
    SpecialrequestModule,
    MaintenancereportModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
