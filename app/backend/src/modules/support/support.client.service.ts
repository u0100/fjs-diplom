import { ID } from '../../infrastructure/global';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { UserService } from '../users/users.service';
import { CreateSupportRequestDto } from './dto/create-support.dto';
import { MarkMessagesAsReadDto } from './dto/mark-message.dto';
import { Message } from './schemas/message.schema';
import { Support } from './schemas/support.schema';

@Injectable()
export class SupportClientService {
  constructor(
    @InjectModel(Support.name) private supportModel: Model<Support>,
    private userService: UserService,
  ) {}

  async createSupportRequest(
    createSupportDto: CreateSupportRequestDto,
  ): Promise<Support> {
    const isValidUserId = mongoose.isValidObjectId(createSupportDto.userId);
    if (!isValidUserId) {
      throw new BadRequestException('Incorrect user ID');
    }

    const user = await this.userService.findById(createSupportDto.userId);
    if (!user) {
      throw new NotFoundException('User ID not found');
    }

    try {
      const createdSupportRequest = new this.supportModel({
        userId: createSupportDto.userId,
      });
      return createdSupportRequest.save();
    } catch (error) {
      console.log('[ERROR]: SupportClientService.createSupportRequest error:');
      console.error(error);
    }
  }

  async markMessagesAsRead(params: MarkMessagesAsReadDto) {
    const isValidSupportId = mongoose.isValidObjectId(params.supportRequestId);
    if (!isValidSupportId) {
      throw new BadRequestException('Incorrect request ID');
    }

    const supportRequest = await this.supportModel
      .findById(params.supportRequestId)
      .select('-__v')
      .exec();
    if (!supportRequest) {
      throw new NotFoundException('No case found with this ID');
    }

    try {
      supportRequest.messages
        .filter((message) => message.authorId != params.userId)
        .filter((message) => message.sentAt <= params.createdBefore)
        .forEach((message) => {
          message.readAt = new Date();
          message.save();
        });
    } catch (error) {
      console.log('[ERROR]: SupportClientService.markMessagesAsRead error:');
      console.error(error);
    }
  }

  async getUnreadCount(supportRequestId: unknown): Promise<Message[]> {
    const isValidSupportId = mongoose.isValidObjectId(supportRequestId);
    if (!isValidSupportId) {
      throw new BadRequestException('Incorrect request ID');
    }

    const supportRequest = await this.supportModel
      .findById(supportRequestId)
      .select('-__v')
      .exec();
    if (!supportRequest) {
      throw new NotFoundException('No case found with this ID');
    }

    return supportRequest.messages.filter((message) => !message.readAt) || [];
  }
}
