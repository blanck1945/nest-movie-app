import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Notification } from './schema/notification.schema';
import { Model } from 'mongoose';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(Notification.name)
    private notificationModel: Model<Notification>,
  ) {}

  async index() {
    return await this.notificationModel.find({
      user_id: '653298e58a858d800c73c01f',
    });
  }

  async create(notificationsOptions) {
    return await this.notificationModel.create({
      ...notificationsOptions,
      expirationDate: new Date(new Date().setDate(new Date().getDate() + 7)),
    });
  }
}
