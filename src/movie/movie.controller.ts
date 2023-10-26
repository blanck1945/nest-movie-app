import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  ParseIntPipe,
  Delete,
} from '@nestjs/common';
import { Param, UseGuards } from '@nestjs/common/decorators';
import { MovieService } from './movie.service';
import { MovieCreateDto } from './dto/movie.create.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { NotFoundModel } from '../core/swagger/notFound.model';
import { UnauthorizedModel } from '../core/swagger/unauthorized.model';
import { ValildationModel } from '../core/swagger/validation.model';
import { RoleGuard } from '../auth/guards/role.guard';
import { MovieUpdateDto } from './dto/movie.update.dto';
import {
  MovieIndexResponseDto,
  MovieShowResponseDto,
} from './responses/index.response.dto';
import { SUCCESS_MESSAGES } from '../core/responses/success';
import { ERROR_MESSAGES } from '../core/responses/error';
import { MovieCreateResponseDto } from './responses/create.response.dto';
import { MovieUpdatedResponseDto } from './responses/update.response.dto';
import { MovieDeleteResponseDto } from './responses/delete.response.dto';

@Controller('movies')
@ApiTags('Movies')
export class MovieController {
  constructor(private movieService: MovieService) {}

  @Get()
  @ApiOkResponse({
    description: SUCCESS_MESSAGES('movie', 'index'),
    type: [MovieIndexResponseDto],
  })
  async index(): Promise<MovieIndexResponseDto> {
    return await this.movieService.index();
  }

  @Get(':id')
  @UseGuards(RoleGuard('regularUser'))
  @ApiBearerAuth()
  @ApiOkResponse({
    description: SUCCESS_MESSAGES('movie', 'show'),
    type: MovieShowResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: ERROR_MESSAGES('unauthorized'),
    type: UnauthorizedModel,
  })
  @ApiNotFoundResponse({
    description: ERROR_MESSAGES('notFound'),
    type: NotFoundModel,
  })
  async show(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<MovieShowResponseDto> {
    return await this.movieService.show(id);
  }

  @Post('create')
  @UseGuards(RoleGuard('admin'))
  @ApiBearerAuth()
  @ApiCreatedResponse({
    description: SUCCESS_MESSAGES('movie', 'create'),
    type: MovieCreateResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: ERROR_MESSAGES('unauthorized'),
    type: UnauthorizedModel,
  })
  @ApiBadRequestResponse({
    description: ERROR_MESSAGES('badRequest'),
    type: ValildationModel,
  })
  async create(@Body() body: MovieCreateDto): Promise<MovieCreateResponseDto> {
    return await this.movieService.create(body);
  }

  @Put(':id')
  @UseGuards(RoleGuard('admin'))
  @ApiBearerAuth()
  @ApiOkResponse({
    description: SUCCESS_MESSAGES('movie', 'update'),
    type: MovieUpdatedResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: ERROR_MESSAGES('unauthorized'),
    type: UnauthorizedModel,
  })
  @ApiNotFoundResponse({
    description: ERROR_MESSAGES('notFound'),
    type: NotFoundModel,
  })
  @ApiBadRequestResponse({
    description: ERROR_MESSAGES('badRequest'),
    type: ValildationModel,
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: MovieUpdateDto,
  ): Promise<MovieUpdatedResponseDto> {
    return await this.movieService.update(id, body);
  }

  @Delete(':id')
  @UseGuards(RoleGuard('admin'))
  @ApiBearerAuth()
  @ApiOkResponse({
    description: SUCCESS_MESSAGES('movie', 'delete'),
    type: MovieDeleteResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: ERROR_MESSAGES('unauthorized'),
    type: UnauthorizedModel,
  })
  @ApiNotFoundResponse({
    description: ERROR_MESSAGES('notFound'),
    type: NotFoundModel,
  })
  @ApiBadRequestResponse({
    description: ERROR_MESSAGES('badRequest'),
    type: ValildationModel,
  })
  async delete(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<MovieDeleteResponseDto> {
    return await this.movieService.delete(id);
  }
}
