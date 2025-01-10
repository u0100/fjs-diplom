import { IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { ID } from '../../../infrastructure/global'

export class CreateRoomDto {
  @IsNotEmpty({
    message: 'Hotel ID is required',
  })
  @IsString()
  readonly hotel: ID;

  @IsNotEmpty({
    message: 'The room name is a required field',
  })
  @IsString()
  readonly title: string;

  @IsOptional()
  @IsString()
  readonly description?: string;

  @IsOptional()
  readonly images?: any;
}
