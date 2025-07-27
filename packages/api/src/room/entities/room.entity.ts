import { ObjectType, Field, Int, ID } from '@nestjs/graphql'
import { Column, ObjectIdColumn } from 'typeorm'

@ObjectType()
export class Room {
  @ObjectIdColumn() // Database link - Typeorm
  @Field(() => ID)
  roomId: string

  @Field(() => String)
  @Column()
  name: string

  @Field(() => Int)
  @Column()
  floor: number

  @Field(() => Int)
  @Column()
  capacity: number
}
