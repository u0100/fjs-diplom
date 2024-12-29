import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reservation, ReservationDocument } from './schema/reservation.schema';
import { ReservationDto, ReservationSearchOptions } from './dto/reservation.dto';

@Injectable()
export class ReservationService {
  constructor(
      @InjectModel(Reservation.name) private reservationModel: Model<ReservationDocument>,
  ) {}

  async addReservation(data: ReservationDto): Promise<Reservation> {
    const isRoomAvailable = await this.reservationModel.exists({
      roomId: data.roomId,
      $or: [
        { dateStart: { $lt: data.dateEnd, $gte: data.dateStart } },
        { dateEnd: { $gt: data.dateStart, $lte: data.dateEnd } },
      ],
    });

    if (isRoomAvailable) {
      throw new Error('Room is not available for the selected dates');
    }

    const reservation = new this.reservationModel(data);
    return reservation.save();
  }

  async removeReservation(id: string): Promise<void> {
    await this.reservationModel.findByIdAndDelete(id);
  }

  async getReservation(
      filter: ReservationSearchOptions,
  ): Promise<Reservation[]> {
    return this.reservationModel.find({
      userId: filter.userId,
      dateStart: { $gte: filter.dateStart },
      dateEnd: { $lte: filter.dateEnd },
    }).exec();
  }
}
