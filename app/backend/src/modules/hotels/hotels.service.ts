import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Hotel, HotelRoom } from './schema/hotels.schema';
import { SearchHotelDto } from './dto/search-hotel.dto';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';

@Injectable()
export class HotelsService {
  constructor(
      @InjectModel(Hotel.name) private hotelModel: Model<Hotel>,
      @InjectModel(HotelRoom.name) private roomModel: Model<HotelRoom>,
  ) {}

  async create(data: CreateHotelDto): Promise<Hotel> {
    const hotel = new this.hotelModel(data);
    return hotel.save();
  }

  async findById(id: string): Promise<Hotel> {
    return this.hotelModel.findById(id).exec();
  }

  async search(params: SearchHotelDto): Promise<Hotel[]> {
    const { limit, offset, title } = params;
    const query = title ? { title: new RegExp(title, 'i') } : {};
    return this.hotelModel.find(query).skip(offset).limit(limit).exec();
  }

  async update(id: string, data: UpdateHotelDto): Promise<Hotel> {
    return this.hotelModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async createRoom(data: Partial<HotelRoom>): Promise<HotelRoom> {
    const room = new this.roomModel(data);
    return room.save();
  }

  async findRoomById(id: string): Promise<HotelRoom> {
    return this.roomModel.findById(id).exec();
  }


  async updateRoom(id: string, data: Partial<HotelRoom>): Promise<HotelRoom> {
    return this.roomModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }
}