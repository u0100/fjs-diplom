import { IsString, IsOptional } from 'class-validator';

export class CreateHotelDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;
}
