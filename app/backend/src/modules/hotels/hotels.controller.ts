import { Controller, Get, Post, Put, Body, Param, Query } from '@nestjs/common';
import { HotelsService } from './hotels.service';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { SearchHotelDto } from './dto/search-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';

@Controller('hotels')
export class HotelsController {
  constructor(private readonly hotelsService: HotelsService) {}

  @Post()
  async create(@Body() data: CreateHotelDto) {
    return this.hotelsService.create(data);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.hotelsService.findById(id);
  }

  @Get()
  async search(@Query() params: SearchHotelDto) {
    return this.hotelsService.search(params);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: UpdateHotelDto) {
    return this.hotelsService.update(id, data);
  }
}
