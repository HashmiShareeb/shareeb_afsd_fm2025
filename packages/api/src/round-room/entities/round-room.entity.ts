import { ObjectType, Field, ID } from '@nestjs/graphql'
import { Column, ObjectIdColumn } from 'typeorm'

export enum RoundRoomStatus {
  OPEN = 'open',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
}
//this is a subentity of Round
//it is used to represent a round room in the context of a round
@ObjectType()
export class RoundRoom {
  @ObjectIdColumn()
  _id: string // stored in MongoDB as _id

  @Field(() => ID)
  get roundRoomId(): string {
    return this._id?.toString() // Convert ObjectId to string for GraphQL
  }

  @Column()
  @Field(() => String)
  roomId: string // ID of the room

  @Column()
  @Field(() => String)
  roomName: string // Name of the room

  @Column()
  @Field(() => String)
  roundId: string // ID of the round this room belongs to

  @Field()
  @Column()
  order: number

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  notes?: string // Optional notes of the room

  @Field(() => String)
  @Column({ default: RoundRoomStatus.OPEN })
  status: RoundRoomStatus

  @Field({ nullable: true })
  @Column({ nullable: true })
  completedAt?: string
}
