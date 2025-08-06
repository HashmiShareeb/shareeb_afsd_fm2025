import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { CreateUserInput } from './create-user.input'
import { InputType, Field, PartialType } from '@nestjs/graphql'
import { Role } from '../entities/user.entity'

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @IsString()
  @IsNotEmpty()
  @Field()
  uid: string // Firebase UID

  @IsOptional()
  @IsString()
  @Field({ nullable: true }) // can return null in graphql if the user has no name
  name?: string

  // @IsOptional()
  // @Field({ nullable: true })
  // locale?: string

  @IsOptional()
  @IsEnum(Role)
  @Field(() => String, { nullable: true })
  role?: Role
}
