import { IsString, IsOptional, IsNumber } from 'class-validator';

export class SearchHotelDto {
  @IsNumber()
  limit: number;

  @IsNumber()
  offset: number;

  @IsOptional()
  @IsString()
  title?: string;
}
