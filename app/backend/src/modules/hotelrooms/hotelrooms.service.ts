import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { ID } from '../../infrastructure/global'
import { InjectModel } from '@nestjs/mongoose'
import mongoose, { Model } from 'mongoose'
import { CreateRoomDto } from './dto/create-room.dto'
import { SearchRoomParamsDto } from './dto/search-room.dto'
import { UpdateRoomDto } from './dto/update-room.dto'
import { HotelRooms } from './schema/hotelrooms.schema'

@Injectable()
export class HotelroomsService {
  constructor(
    @InjectModel(HotelRooms.name) private hotelroomsModel: Model<HotelRooms>,
  ) {}

  async create(createRoomDto: CreateRoomDto): Promise<HotelRooms> {
    const isValidId = mongoose.isValidObjectId(createRoomDto.hotel);
    if (!isValidId) {
      throw new BadRequestException('Incorrect hotel ID');
    }

    const data = {
      ...createRoomDto,
      isEnabled: true,
    };

    try {
      const createdRoom = new this.hotelroomsModel(data);
      return createdRoom.save();
    } catch (e) {
      console.log('[ERROR]: HotelroomsService.create error:');
      console.error(e);
    }
  }

  async update(
    roomId: ID,
    updateRoomDto: UpdateRoomDto,
    images: string[],
  ): Promise<HotelRooms> {
    const data = { ...updateRoomDto, images };

    return await this.hotelroomsModel.findByIdAndUpdate(
      { _id: roomId },
      { $set: { ...data } },
      { new: true },
    );
  }

  async findById(roomId: ID): Promise<HotelRooms> {
    const isValidId = mongoose.isValidObjectId(roomId);
    if (!isValidId) {
      throw new BadRequestException('Incorrect room ID');
    }

    const room = await this.hotelroomsModel.findById(roomId);
    if (!room) {
      throw new NotFoundException('hotel ID is not found');
    }

    return room;
  }

  async search(params: SearchRoomParamsDto): Promise<HotelRooms[]> {
    const { limit, offset, hotel, isEnabled, title } = params;
    const query: Partial<SearchRoomParamsDto> = {
      hotel,
      title: { $regex: new RegExp(title, 'i') },
    };

    if (typeof isEnabled !== 'undefined') {
      query.isEnabled = isEnabled;
    }

    return await this.hotelroomsModel
      .find(query)
      .limit(limit ?? 0)
      .skip(offset ?? 0);
  }
}
