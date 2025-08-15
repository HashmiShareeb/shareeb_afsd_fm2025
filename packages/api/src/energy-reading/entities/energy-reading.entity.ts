import { ObjectType, Field, ID, Float } from '@nestjs/graphql'
import { User } from 'src/user/entities/user.entity'
import { Column, Entity, ObjectIdColumn } from 'typeorm'
import { registerEnumType } from '@nestjs/graphql'

export enum MeterType {
  ELECTRICITY = 'electricity',
  WATER = 'water',
  GAS = 'gas',
}

registerEnumType(MeterType, {
  name: 'MeterType',
  description: 'Type of meter for energy-readings',
})

@Entity()
@ObjectType()
export class EnergyReading {
  @ObjectIdColumn()
  _id: string

  @Field(() => ID)
  get readingId(): string {
    return this._id?.toString()
  }
  @Field()
  @Column()
  buildingId: string

  @Field(() => MeterType)
  @Column({ type: 'enum', enum: MeterType })
  meterType: MeterType

  @Field(() => Float)
  @Column()
  value: number

  @Column({ default: 'kWh' })
  @Field()
  unit: string

  @Field()
  @Column()
  recordedById: string //user _id

  @Field(() => User, { nullable: true })
  recordedBy?: User

  @Field()
  @Column()
  recordedAt: Date
}
