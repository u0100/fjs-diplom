import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator'

export class SignUpDto {
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail(undefined, {
    message: 'Email is incorrect',
  })
  readonly email: string;

  @IsNotEmpty({ message: 'Email is required' })
  @IsString()
  @MinLength(6, { message: 'The password must consist of 6 or more characters' })
  readonly password: string;

  @IsNotEmpty({ message: 'Name is required' })
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsString()
  readonly contactPhone?: string;
}
