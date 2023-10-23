import {
  Controller,
  Post,
  Body,
  HttpCode,
  UseGuards,
  Put,
  Param,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/user.dt';
import { LoginUserDto } from './dto/loginUser.dto';
import { AdminGuard } from './guards/admin.guards';
import { User } from './decorators/user.decorator';
import { User as UserSchema } from './schema/user.schema';
import { UserExists } from './decorators/userExists.decorator';
import { UserExistGuard } from './guards/userExists.guard';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserService } from '../user/user.service';
import { SignupModelResponse } from './swagger/signup.model';
import { ValildationModel } from '../core/swagger/validation.model';
import { NotFoundModel } from '../core/swagger/notFound.model';
import { LoginModelResponse } from './swagger/login.model';
import { ChangeRoleDto } from './dto/changeRole.dto';
import { MongooseIdPipe } from '../core/pipes/mongooseId.pipe';
import { ChangeRoleModelResponse } from './swagger/changeRole.model';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('signup')
  @ApiCreatedResponse({
    description: 'User created successfully',
    type: SignupModelResponse,
  })
  @ApiBadRequestResponse({
    description: 'Bad request.',
    type: ValildationModel,
  })
  @HttpCode(201)
  async signup(@Body() body: CreateUserDto) {
    return this.userService.create(body);
  }

  @Post('login')
  @ApiOkResponse({
    description: 'User logged in successfully.',
    type: LoginModelResponse,
  })
  @ApiBadRequestResponse({
    description: 'Bad request.',
    type: ValildationModel,
  })
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

  @Put('change-role/:userId')
  @UseGuards(AdminGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'User role changed successfully.',
    type: ChangeRoleModelResponse,
  })
  @ApiBadRequestResponse({
    description: 'Bad request.',
    type: ValildationModel,
  })
  @ApiNotFoundResponse({ description: 'User not found.', type: NotFoundModel })
  async changeRole(
    @Body() body: ChangeRoleDto,
    @Param('userId', MongooseIdPipe) userId: string,
  ) {
    return this.userService.changeRole(userId, body.role);
  }
}
