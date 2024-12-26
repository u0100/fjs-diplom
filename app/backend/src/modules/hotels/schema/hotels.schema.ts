import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Hotel extends Document {
  @Prop({ required: true, unique: true })
  _id: string;

  @Prop({ required: true })
  title: string;

  @Prop()
  description?: string;

  @Prop({ default: () => new Date() })
  createdAt: Date;

  @Prop({ default: () => new Date() })
  updatedAt: Date;
}

export const HotelSchema = SchemaFactory.createForClass(Hotel);

@Schema({ timestamps: true })
export class HotelRoom extends Document {
  @Prop({ required: true, unique: true })
  _id: string;

  @Prop({ required: true })
  hotel: string;

  @Prop()
  description?: string;

  @Prop({ type: [String], default: [] })
  images: string[];

  @Prop({ default: true })
  isEnabled: boolean;

  @Prop({ default: () => new Date() })
  createdAt: Date;

  @Prop({ default: () => new Date() })
  updatedAt: Date;
}

export const HotelRoomSchema = SchemaFactory.createForClass(HotelRoom);