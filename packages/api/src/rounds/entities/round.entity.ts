import { ObjectType, Field, ID } from '@nestjs/graphql'
import { User } from 'src/user/entities/user.entity'
import { Entity, ObjectIdColumn } from 'typeorm'

@Entity()
@ObjectType()
export class Round {
  @ObjectIdColumn()
  _id: string // stored in MongoDB as _id

  @Field(() => ID)
  get rounId(): string {
    return this._id?.toString() // Convert ObjectId to string for GraphQL
  }

  @Field()
  name: string

  @Field()
  date: Date

  // @Field()
  // startTime: string

  // @Field()
  // endTime: string

  @Field()
  assignedTo: User // name not yet decided

  @Field()
  status: 'Gepland' | 'Bezig' | 'Afgerond' | 'Geannuleerd'
}
