import { Injectable } from '@nestjs/common';
import { LoginUserDto } from './dto/loginUser.dto';
import { UserService } from '../user/user.service';
import { sign } from 'jsonwebtoken';
import { NotificationService } from '../notification/notification.service';

@Injectable()
export class AuthService {
  constructor(
    private userSerive: UserService,
    private notificationService: NotificationService,
  ) {}

  async signup(body) {
    return await this.userSerive.create(body);
  }

  async login({ username }: LoginUserDto) {
    const user = await this.userSerive.checkUserExist({ username });

    const token = await this.generateToken(user);

    return {
      user,
      token,
    };
  }

  async generateToken(user) {
    const payload = {
      username: user.username,
      role: user.role,
      email: user.email,
    };
    return await sign(payload, process.env.JWT_SECRET);
  }

  async switchUserRole(user, userExists, role) {
    const token = await this.generateToken({
      username: userExists.username,
      role,
    });

    const notification = await this.notificationService.create({
      user_id: userExists._id,
      token,
      type: 'action required',
      message: 'Cambia el role de tu cuenta',
      reference: 'change role',
    });

    console.warn('NOTIFICATION', userExists._id);

    await this.userSerive.addNotification(userExists._id, notification);

    return {
      message: 'Token generado con exito',
    };
  }
}
