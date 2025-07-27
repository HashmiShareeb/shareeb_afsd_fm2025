import { ObjectType, Field, Int, ID } from '@nestjs/graphql'
import { Column, Entity, ObjectIdColumn } from 'typeorm'

@ObjectType()
@Entity()
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

  @Field(() => String)
  @Column()
  buildingId: string
}
