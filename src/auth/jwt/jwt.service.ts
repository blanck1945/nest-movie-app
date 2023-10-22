import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtTokenService {
  constructor(private jwtService: JwtService) {}

  async generateToken(user) {
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
      console.log(err);
    }
  }
}
