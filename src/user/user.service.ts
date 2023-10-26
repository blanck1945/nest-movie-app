import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CreateUserDto } from '../auth/dto/user.dt';
import { User } from './schema/user.schema';
import {
  SingupResponse,
  SingupResponseDto,
} from 'src/user/responses/auth.response';
import { RolesTypes } from 'src/core/enums/roles';
import { LoginUserDto } from 'src/auth/dto/loginUser.dto';
import { JwtTokenService } from 'src/auth/jwt/jwt.service';
import { ResponseService } from 'src/core/responses/response.service';
import { SUCCESS_MESSAGES } from 'src/core/responses/success';
import { LoginResponse, LoginResponseDto } from './responses/login.response';
import { ERROR_MESSAGES } from 'src/core/responses/error';
import {
  ChangeRoleResponse,
  ChangeRoleResponseDto,
} from './responses/changeRole.response';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtTokenService: JwtTokenService,
    private responseService: ResponseService,
  ) {}

  async findOne(optionsObj) {
    try {
      const user = await this.userModel
        .findOne(optionsObj.filter || {})
        .select(optionsObj.select || '')
        .sort(optionsObj.sort || 'asc')
        .populate(optionsObj.populate || null)
        .exec();

      if (!user) {
        throw new BadRequestException(ERROR_MESSAGES('invalidCredentials'));
      }

      return user;
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }

  async singup(data: CreateUserDto): Promise<SingupResponseDto> {
    try {
      const newUser = await this.userModel.create(data);

      return this.responseService.success<SingupResponse>(
        {
          user_id: newUser._id,
          email: newUser.email,
          username: newUser.username,
        },
        SUCCESS_MESSAGES('user', 'create'),
      );
    } catch (error) {
      throw new HttpException(ERROR_MESSAGES('emailAlreadyExists'), 400);
    }
  }

  async login({ username, password }: LoginUserDto): Promise<LoginResponseDto> {
    try {
      const user = await this.userModel.findOne({
        filter: { username },
      });

      const isValid = await user.comparePassword(password);

      if (!isValid) {
        throw new BadRequestException(ERROR_MESSAGES('invalidCredentials'));
      }

      const token = await this.jwtTokenService.generateToken(user);

      return this.responseService.success<LoginResponse>(
        {
          user,
          token,
        },
        SUCCESS_MESSAGES('user', 'login'),
      );
    } catch (error) {
      throw new HttpException(ERROR_MESSAGES('invalidCredentials'), 400);
    }
  }

  async changeRole(
    user_id: mongoose.Types.ObjectId,
    role: RolesTypes,
  ): Promise<ChangeRoleResponseDto> {
    try {
      const user = await this.userModel.findById(user_id);

      if (!user) {
        throw new NotFoundException(ERROR_MESSAGES('notFound'));
      }

      user.role = role;
      await user.save();

      return this.responseService.success<ChangeRoleResponse>(
        {
          user_id: user._id,
          newRole: user.role,
        },
        SUCCESS_MESSAGES('user', 'changeRole'),
      );
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }
}
