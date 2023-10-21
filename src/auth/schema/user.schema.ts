import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { Notification } from 'src/notification/schema/notification.schema';

export type UserDocument = HydratedDocument<User>;

@Schema({
  timestamps: true,
})
export class User {
  @Prop({
    required: true,
    trim: true,
    type: String,
  })
  email: string;

  @Prop({
    required: true,
    trim: true,
    enum: ['Usuario Regular', 'Administrador'],
    default: 'Usuario Regular',
  })
  role: string;

  @Prop({
    required: true,
    trim: true,
    type: String,
  })
  firstName: string;

  @Prop({
    required: true,
    trim: true,
    type: String,
  })
  lastName: string;

  @Prop({
    required: true,
    trim: true,
    type: String,
  })
  username: string;

  @Prop({
    required: true,
    trim: true,
    type: String,
    select: false,
  })
  password: string;

  @Prop({
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Notification',
    refPath: 'user_id',
  })
  notifications: Notification[];
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (error) {
    return next(error);
  }
});