import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { LoginUserDto } from './dto/loginUser.dto';
import { UserService } from '../user/user.service';
import { NotificationService } from '../notification/notification.service';
import { JwtTokenService } from './jwt/jwt.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtTokenService: JwtTokenService,
    private userSerive: UserService,
    private notificationService: NotificationService,
  ) {}

  async login({ username, password }: LoginUserDto) {
    try {
      const user = await this.userSerive.findOne({
        filter: { username },
        populate: 'notifications',
      });

      const isValid = await user.comparePassword(password);

      if (!isValid) {
        throw new BadRequestException('Invalid credentials');
      }

      const token = await this.jwtTokenService.generateToken(user);

      return {
        hasError: false,
        message: 'User logged in successfully',
        user,
        token,
      };
    } catch (error) {
      throw new HttpException('Invalid credentials', 400);
    }
  }

  async switchUserRole(user, userExists, role) {
    const token = await this.jwtTokenService.generateToken({
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

    await this.userSerive.addNotification(userExists._id, notification);

    return {
      message: 'Token generado con exito',
    };
  }
}
