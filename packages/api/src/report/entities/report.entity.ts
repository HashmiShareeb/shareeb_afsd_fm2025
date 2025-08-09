import { ObjectType, Field, ID } from '@nestjs/graphql'
import { Column, CreateDateColumn, Entity, ObjectIdColumn } from 'typeorm'

@Entity()
@ObjectType()
export class Report {
  @ObjectIdColumn()
  _id: string

  @Field(() => ID)
  get reportId(): string {
    return this._id?.toString()
  }

  @Column()
  @Field()
  title: string

  @Column()
  @Field()
  description: string

  @Column()
  @Field()
  buildingId: string

  @Column()
  @Field()
  roomId: string

  @Column()
  @Field()
  reportedById: string // User id

  @Column({ default: 'new' })
  @Field()
  status: 'new' | 'in_progress' | 'resolved'

  @CreateDateColumn()
  @Field()
  createdAt: Date
}
