import { Controller, Get, Post, Delete, Body, Query, Param } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationDto, ReservationSearchOptions } from './dto/reservation.dto';

@Controller('reservations')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  async addReservation(@Body() reservationDto: ReservationDto) {
    return this.reservationService.addReservation(reservationDto);
  }

  @Delete(':id')
  async removeReservation(@Param('id') id: string) {
    return this.reservationService.removeReservation(id);
  }

  @Get()
  async getReservation(@Query() filter: ReservationSearchOptions) {
    return this.reservationService.getReservation(filter);
  }
}