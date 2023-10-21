import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type NotificationDocument = HydratedDocument<Notification>;

@Schema({
  timestamps: true,
})
export class Notification {
  @Prop({
    required: true,
    ref: 'User',
    type: mongoose.Schema.Types.ObjectId,
  })
  user_id: string;

  @Prop({
    required: true,
    trim: true,
    type: String,
    enum: ['message', 'action required', 'alert', 'warning', 'error'],
  })
  type: 'message' | 'action required' | 'alert' | 'warning' | 'error';

  @Prop({
    trim: true,
    type: String,
  })
  message: string;

  @Prop({
    trim: true,
    type: String,
  })
  token: string;

  @Prop({
    trim: true,
    type: Date,
  })
  expirationDate: Date;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
