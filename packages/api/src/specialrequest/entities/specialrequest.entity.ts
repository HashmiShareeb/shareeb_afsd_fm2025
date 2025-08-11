import { ObjectType, Field, ID } from '@nestjs/graphql'
import { Building } from 'src/building/entities/building.entity'
import { User } from 'src/user/entities/user.entity'
import { Column, CreateDateColumn, Entity, ObjectIdColumn } from 'typeorm'

export enum SpecialRequestStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

@Entity()
@ObjectType()
export class Specialrequest {
  @ObjectIdColumn()
  _id: string

  @Field(() => ID)
  get requestId(): string {
    return this._id.toString()
  }

  @Column()
  @Field()
  title: string

  @Column()
  @Field()
  description: string

  @CreateDateColumn()
  @Field()
  requestedAt: Date

  @Column()
  @Field(() => String)
  requestedById: string

  @Field(() => User, { nullable: true })
  requestedBy?: User // Alleen voor GraphQL resolven, niet in DB

  @Column({ default: SpecialRequestStatus.PENDING })
  @Field()
  status: SpecialRequestStatus

  @Field()
  @Column()
  roomId: string

  @Field()
  @Column()
  building: Building
}
