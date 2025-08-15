import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql'
import { Column, ObjectIdColumn } from 'typeorm'

export enum ChecklistItemStatus {
  OK = 'OK',
  PROBLEM = 'PROBLEM',
  NOT_CHECKED = 'NOT_CHECKED',
}

registerEnumType(ChecklistItemStatus, {
  name: 'ChecklistItemStatus', // GraphQL enum name
})

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
