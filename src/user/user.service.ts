import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from '../auth/dto/user.dt';
import { CoreService } from '../core/core.service';
import { User } from '../auth/schema/user.schema';

@Injectable()
export class UserService extends CoreService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {
    super();
  }

  async addNotification(user_id, notification) {
    const user = await this.userModel.findById(user_id);

    if (!user) {
      throw new Error('User not found');
    }

    user.notifications.push(notification);
    await user.save();

    return user;
  }

  async checkUserExist(field) {
    try {
      const user = await this.userModel.findOne(field);

      if (!user) {
        throw new Error('User not found');
      }

      return user;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async create(data: CreateUserDto) {
    const newUser = await this.insert(this.userModel, data);
    return newUser._id;
  }
}
