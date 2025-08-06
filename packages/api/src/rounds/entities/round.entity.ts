import { ObjectType, Field, ID } from '@nestjs/graphql'
import { User } from 'src/user/entities/user.entity'
import { Column, Entity, ObjectIdColumn } from 'typeorm'

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
  get rounId(): string {
    return this._id?.toString() // Convert ObjectId to string for GraphQL
  }

  @Column()
  @Field()
  roundName: string

  @Column()
  @Field()
  startTime: string

  @Column()
  @Field()
  endTime: string

  @Column(() => User)
  @Field(() => User)
  assignedTo: User

  @Column()
  @Field()
  buildingId: string
  @Column()
  @Field(() => String)
  status: RoundStatus

  // @Field()
  // date: Date
}
