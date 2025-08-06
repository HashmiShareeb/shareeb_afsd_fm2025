import { InputType, Field } from '@nestjs/graphql'
import { IsEnum, IsNotEmpty, IsString } from 'class-validator'
import { Role } from '../entities/user.entity'

@InputType()
export class CreateUserInput {
  @IsString()
  @IsNotEmpty()
  @Field()
  uid: string // Firebase UID

  @IsString()
  @IsNotEmpty()
  @Field({ nullable: true }) // can return null in graphql if the user has no name
  name?: string

  // @Field({ nullable: true }) --> for later use
  // locale?: string

  @IsEnum(Role)
  @Field(() => String)
  role: Role
}
