import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator'

export class SignInDto {
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail(undefined, {
    message: 'Email is incorrect',
  })
  readonly email: string;

  @IsNotEmpty({ message: 'Password is required' })
  @IsString()
  @MinLength(6, { message: 'The password must consist of 6 or more characters' })
  readonly password: string;
}
