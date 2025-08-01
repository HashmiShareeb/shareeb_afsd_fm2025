import { ObjectType, Field, ID } from '@nestjs/graphql'
import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm'

export enum Role {
  USER = 'USER', // regular user --> docent
  MANAGER = 'MANAGER', // building manager | concierge?
  ADMIN = 'ADMIN', //facility manager
}

@Entity()
@ObjectType()
export class User {
  @ObjectIdColumn() // Database link - Typeorm
  @Field(() => ID) // GraphQL
  id: string

  @Column()
  @Field()
  uid: string // Firebase UID

  @Column()
  @Field({ nullable: true }) // can return null in graphql if the user has no name
  name?: string

  @Column()
  @Field(() => String)
  email: string

  @Column({ default: Role.USER })
  @Field(() => String)
  role: Role

  // @Column()
  // @Field({ nullable: true }) // Can return null in GraphQL if the user has no locale
  // locale?: string

  @CreateDateColumn({ type: 'timestamp', nullable: true })
  @Field({ nullable: true })
  createdAt?: Date

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  @Field({ nullable: true })
  updatedAt?: Date
}
