import { ObjectType, Field, Int, ID } from '@nestjs/graphql'
//import { Building } from 'src/building/entities/building.entity'
import { Column, Entity, ObjectIdColumn } from 'typeorm'

@ObjectType()
@Entity()
export class Room {
  @ObjectIdColumn()
  _id: string // stored in MongoDB as _id

  @Field(() => ID)
  get roomId(): string {
    return this._id?.toString() // Convert ObjectId to string for GraphQL
  }

  @Field(() => String)
  @Column()
  name: string

  @Field(() => Int)
  @Column()
  floor: number

  @Field(() => Int)
  @Column()
  capacity: number

  @Field(() => String)
  @Column()
  buildingId: string
}
