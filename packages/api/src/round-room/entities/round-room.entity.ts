import { ObjectType, Field } from '@nestjs/graphql'
import { Checklistitem } from 'src/checklistitem/entities/checklistitem.entity'
import { Column } from 'typeorm'

export enum RoundRoomStatus {
  OPEN = 'open',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
}
//this is a subentity of Round
//it is used to represent a round room in the context of a round
@ObjectType()
export class RoundRoom {
  @Field(() => String)
  roundRoomId: string // Ensure this is non-nullable

  @Column()
  @Field(() => String)
  roomId: string // ID of the room

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  roomName?: string // Name of the room (optional)

  @Column()
  @Field(() => String)
  roundId: string // ID of the round this room belongs to

  @Field()
  @Column()
  order: number

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  notes?: string // Optional notes of the room

  @Field(() => String)
  @Column({ default: RoundRoomStatus.OPEN })
  status: RoundRoomStatus

  @Field({ nullable: true })
  @Column({ nullable: true })
  completedAt?: string

  @Field(() => [Checklistitem])
  @Column({ type: 'json', default: [] })
  checklist: Checklistitem[]
}
