import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Booking, BookingDocument } from './schema/booking.schema';
import { BookingDto, BookingSearchOptions } from './dto/booking.dto';

@Injectable()
export class BookingService {
  constructor(
      @InjectModel(Booking.name) private bookingModel: Model<BookingDocument>,
  ) {}

  async addBooking(data: BookingDto): Promise<Booking> {
    const isRoomAvailable = await this.bookingModel.exists({
      roomId: data.roomId,
      $or: [
        { dateStart: { $lt: data.dateEnd, $gte: data.dateStart } },
        { dateEnd: { $gt: data.dateStart, $lte: data.dateEnd } },
      ],
    });

    if (isRoomAvailable) {
      throw new Error('Room is not available for the selected dates');
    }

    const booking = new this.bookingModel(data);
    return booking.save();
  }

  async removeBooking(id: string): Promise<void> {
    await this.bookingModel.findByIdAndDelete(id);
  }

  async getBooking(
      filter: BookingSearchOptions,
  ): Promise<Booking[]> {
    return this.bookingModel.find({
      userId: filter.userId,
      dateStart: { $gte: filter.dateStart },
      dateEnd: { $lte: filter.dateEnd },
    }).exec();
  }
}
