import { ObjectType, Field, ID } from '@nestjs/graphql'
import { Column, Entity, ObjectIdColumn } from 'typeorm'

@Entity() //? typeORM
@ObjectType() //NestJS GraphQL decorator
export class Building {
  // @ObjectIdColumn() //!!Typeorm --> ID MONGODB
  // @Field(() => ID) // GraphQL
  // buildingId: string

  @ObjectIdColumn()
  _id: string // stored in MongoDB as _id

  @Field(() => ID)
  get buildingId(): string {
    return this._id?.toString() // Convert ObjectId to string for GraphQL
  }

  @Field() // graphql
  @Column() // typeORM database link
  name: string

  @Field() // graphql
  @Column() // typeORM database link
  address: string

  @Field() // graphql
  @Column() // typeORM database link
  type: string

  @Column() // typeORM database link
  @Field({ nullable: true }) // graphql
  description?: string

  // @Field(() => [Room], { nullable: true }) // GraphQL
  // rooms?: Room[]
}
