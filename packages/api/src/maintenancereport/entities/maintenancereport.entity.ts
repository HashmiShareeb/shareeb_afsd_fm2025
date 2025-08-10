import { ObjectType, Field, ID } from '@nestjs/graphql'
import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm'
import { registerEnumType } from '@nestjs/graphql'
import { User } from 'src/user/entities/user.entity'

export enum ReportStatus {
  NEW = 'NEW',
  IN_PROGRESS = 'IN_PROGRESS',
  RESOLVED = 'RESOLVED',
}

registerEnumType(ReportStatus, {
  name: 'ReportStatus', // this is the name visible in the GraphQL schema
  description: 'Status of the maintenance report',
})

@Entity()
@ObjectType()
export class Maintenancereport {
  @ObjectIdColumn()
  _id: string // stored in MongoDB as _id

  @Field(() => ID)
  get reportId(): string {
    return this._id?.toString()
  }

  @Column({ nullable: true })
  @Field({ nullable: true })
  title?: string

  @Column()
  @Field()
  roomId: string

  @Column()
  @Field()
  description: string

  @Column({ default: ReportStatus.NEW })
  @Field()
  status: ReportStatus

  @Column()
  @Field()
  reportedById: string

  @Field(() => User, { nullable: true })
  reportedBy?: User

  @CreateDateColumn({ type: 'timestamp', nullable: true })
  @Field()
  reportedAt: Date

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  @Field({ nullable: true })
  updatedAt?: Date
}
