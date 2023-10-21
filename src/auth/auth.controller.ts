import { Controller, Post, Body, HttpCode, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/user.dt';
import { LoginUserDto } from './dto/loginUser.dto';
import { AdminGuard } from './guards/admin.guards';
import { User } from './decorators/user.decorator';
import { User as UserSchema } from './schema/user.schema';
import { UserExists } from './decorators/userExists.decorator';
import { UserExistGuard } from './guards/userExists.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @HttpCode(201)
  async signup(@Body() body: CreateUserDto) {
    return this.authService.signup(body);
  }

  @Post('login')
  async login(@Body() body: LoginUserDto) {
    return this.authService.login(body);
  }

  @Post('admin')
  @UseGuards(AdminGuard, UserExistGuard)
  async admin(
    @User() user: UserSchema,
    @UserExists() userExists: any,
    @Body('newRole') newRole: string,
  ) {
    return this.authService.switchUserRole(user, userExists, newRole);
  }
}
