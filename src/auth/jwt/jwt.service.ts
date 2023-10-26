import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/schema/user.schema';

@Injectable()
export class JwtTokenService {
  constructor(private jwtService: JwtService) {}

  async generateToken(user: User) {
    const payload = {
      username: user.username,
      role: user.role,
      email: user.email,
    };

    try {
      return await this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: '12h',
      });
    } catch (err) {
      throw new InternalServerErrorException('Could not generate token');
    }
  }
}
