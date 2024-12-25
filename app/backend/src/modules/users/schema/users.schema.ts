import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ObjectId } from 'mongodb';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ type: ObjectId, required: true, unique: true, auto: true })
  _id: ObjectId;

  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Prop({ type: String, required: true })
  passwordHash: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: false })
  contactPhone?: string;

  @Prop({ type: String, required: true, enum: ['client', 'admin', 'manager'], default: 'client' })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
