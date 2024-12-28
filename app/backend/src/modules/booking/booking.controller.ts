import { Controller, Get, Post, Delete, Body, Query, Param } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingDto, BookingSearchOptions } from './dto/booking.dto';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  async addBooking(@Body() bookingDto: BookingDto) {
    return this.bookingService.addBooking(bookingDto);
  }

  @Delete(':id')
  async removeBooking(@Param('id') id: string) {
    return this.bookingService.removeBooking(id);
  }

  @Get()
  async getBooking(@Query() filter: BookingSearchOptions) {
    return this.bookingService.getBooking(filter);
  }
}