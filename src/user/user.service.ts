import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from '../auth/dto/user.dt';
import { User } from '../auth/schema/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async addNotification(user_id, notification) {
    const user = await this.userModel.findById(user_id);

    if (!user) {
      throw new Error('User not found');
    }

    user.notifications.push(notification);
    await user.save();

    return user;
  }

  async findOne(optionsObj) {
    try {
      const user = await this.userModel
        .findOne(optionsObj.filter || {})
        .select(optionsObj.select || '')
        .sort(optionsObj.sort || 'asc')
        .populate(optionsObj.populate || null)
        .exec();

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
    const newUser = await this.userModel.create(data);
    return {
      hasError: false,
      message: 'User created successfully',
      user_id: newUser._id,
      email: newUser.email,
      username: newUser.username,
    };
  }

  async changeRole(user_id, role) {
    const user = await this.userModel.findById(user_id);

    if (!user) {
      throw new Error('User not found');
    }

    user.role = role;
    await user.save();

    return {
      hasError: false,
      message: 'User role changed successfully',
      user_id: user._id,
      newRole: user.role,
    };
  }
}
