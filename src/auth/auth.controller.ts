import {
  Controller,
  Post,
  Body,
  HttpCode,
  UseGuards,
  Put,
  Param,
} from '@nestjs/common';
import { CreateUserDto } from './dto/user.dt';
import { LoginUserDto } from './dto/loginUser.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserService } from '../user/user.service';
import { ValildationModel } from '../core/swagger/validation.model';
import { NotFoundModel } from '../core/swagger/notFound.model';
import { ChangeRoleDto } from './dto/changeRole.dto';
import { MongooseIdPipe } from '../core/pipes/mongooseId.pipe';
import { RoleGuard } from './guards/role.guard';
import mongoose from 'mongoose';
import { SingupResponseDto } from 'src/user/responses/auth.response';
import { LoginResponseDto } from 'src/user/responses/login.response';
import { ChangeRoleResponseDto } from 'src/user/responses/changeRole.response';
import { ERROR_MESSAGES } from 'src/core/responses/error';
import { SUCCESS_MESSAGES } from 'src/core/responses/success';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private userService: UserService) {}

  @Post('signup')
  @ApiCreatedResponse({
    description: SUCCESS_MESSAGES('user', 'create'),
    type: SingupResponseDto,
  })
  @ApiBadRequestResponse({
    description: ERROR_MESSAGES('badRequest'),
    type: ValildationModel,
  })
  @HttpCode(201)
  async signup(@Body() body: CreateUserDto): Promise<SingupResponseDto> {
    return this.userService.singup(body);
  }

  @Post('login')
  @ApiOkResponse({
    description: SUCCESS_MESSAGES('user', 'login'),
    type: LoginResponseDto,
  })
  @ApiBadRequestResponse({
    description: ERROR_MESSAGES('badRequest'),
    type: ValildationModel,
  })
  async login(@Body() body: LoginUserDto): Promise<LoginResponseDto> {
    return this.userService.login(body);
  }

  @Put('change-role/:userId')
  @UseGuards(RoleGuard('admin'))
  @ApiBearerAuth()
  @ApiOkResponse({
    description: SUCCESS_MESSAGES('user', 'changeRole'),
    type: ChangeRoleResponseDto,
  })
  @ApiBadRequestResponse({
    description: ERROR_MESSAGES('badRequest'),
    type: ValildationModel,
  })
  @ApiNotFoundResponse({
    description: ERROR_MESSAGES('notFound'),
    type: NotFoundModel,
  })
  async changeRole(
    @Body() body: ChangeRoleDto,
    @Param('userId', MongooseIdPipe) userId: mongoose.Types.ObjectId,
  ): Promise<ChangeRoleResponseDto> {
    return this.userService.changeRole(userId, body.role);
  }
}
