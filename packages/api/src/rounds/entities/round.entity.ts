import { ObjectType, Field, ID } from '@nestjs/graphql'
import { RoundRoom } from 'src/round-room/entities/round-room.entity'
//import { User } from 'src/user/entities/user.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm'

export enum RoundStatus {
  PLANNED = 'planned',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

@Entity()
@ObjectType()
export class Round {
  @ObjectIdColumn()
  _id: string // stored in MongoDB as _id

  @Field(() => ID)
  get roundId(): string {
    return this._id?.toString() // Convert ObjectId to string for GraphQL
  }

  @Column()
  @Field()
  name: string

  @CreateDateColumn({ type: 'timestamp', nullable: true })
  @Field()
  startTime: string

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  @Field()
  endTime: string //completedAt?

  @Column()
  @Field()
  assignedToId: string

  // @Field(() => User)
  // assignedTo: User
  @Column()
  @Field()
  buildingId: string

  @Column({ default: RoundStatus.PLANNED })
  @Field(() => String)
  status: RoundStatus = RoundStatus.PLANNED

  @Field(() => [RoundRoom])
  @Column({ type: 'json' })
  rooms: RoundRoom[]
}
