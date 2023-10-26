import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  mixin,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UserService } from '../../user/user.service';
import { ROLES } from 'src/core/enums/roles';

export const RoleGuard = (role: keyof typeof ROLES) => {
  @Injectable()
  class RoleGuardMixin implements CanActivate {
    constructor(
      public jwtService: JwtService,
      public userService: UserService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);
      if (!token) {
        throw new UnauthorizedException();
      }

      try {
        const payload = await this.jwtService.verifyAsync(token, {
          secret: process.env.JWT_SECRET,
        });

        const user = await this.userService.findOne({
          filter: { username: payload.username },
        });

        if (user.role !== ROLES[role]) {
          throw new UnauthorizedException();
        }

        request['user'] = user;
        return true;
      } catch (error) {
        throw new UnauthorizedException();
      }
    }

    public extractTokenFromHeader(request: Request): string | undefined {
      const [type, token] = request.headers.authorization?.split(' ') ?? [];
      return type === 'Bearer' ? token : undefined;
    }
  }

  const guard = mixin(RoleGuardMixin);
  return guard;
};
