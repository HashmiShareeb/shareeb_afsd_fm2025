import { ObjectType, Field, ID } from '@nestjs/graphql'
import { Column, ObjectIdColumn } from 'typeorm'

export enum ChecklistItemStatus {
  OK = 'OK',
  PROBLEM = 'PROBLEM',
  NOT_CHECKED = 'NOT_CHECKED',
}

@ObjectType()
export class Checklistitem {
  @ObjectIdColumn()
  _id: string

  @Field(() => ID)
  get itemId(): string {
    return this._id?.toString()
  }

  @Column()
  @Field()
  label: string

  @Column()
  @Field(() => String)
  status: ChecklistItemStatus

  @Column()
  @Field(() => String, { nullable: true })
  notes?: string
}
