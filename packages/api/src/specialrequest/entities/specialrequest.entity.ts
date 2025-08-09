import { ObjectType, Field, ID } from '@nestjs/graphql'
import { Column, CreateDateColumn, ObjectIdColumn } from 'typeorm'

export enum SpecialRequestStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

@ObjectType()
export class Specialrequest {
  @ObjectIdColumn()
  _id: string

  @Field(() => ID)
  get requestId(): string {
    return this._id.toString()
  }

  @Field()
  @Column()
  title: string

  @Field()
  @Column()
  details: string

  @Field(() => String)
  @Column()
  status: SpecialRequestStatus

  @Field()
  @Column()
  requesterId: string

  @Field()
  @Column()
  buildingId: string

  @CreateDateColumn()
  createdAt: Date
}
