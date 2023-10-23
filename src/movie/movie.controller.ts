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
import { UserGuard } from '../auth/guards/user.guards';
import { AdminGuard } from '../auth/guards/admin.guards';
import { CreateMovieDto, UpdateMovieDto } from './dto/movie.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { MovieReturnModel } from './swagger/movie.return';
import { NotFoundModel } from '../core/swagger/notFound.model';
import { UnauthorizedModel } from '../auth/swagger/unauthorized.model';
import { ValildationModel } from '../core/swagger/validation.model';
import { UpdateModelResponse } from './swagger/update.model';
import { DeleteModelResponse } from './swagger/delete.model';

@Controller('/movies')
@ApiTags('Movies')
export class MovieController {
  constructor(private movieService: MovieService) {}

  @Get()
  @ApiOkResponse({
    description: 'Movies retrieved successfully.',
    type: [MovieReturnModel],
  })
  async index() {
    return this.movieService.index();
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(UserGuard)
  @ApiOkResponse({
    description: 'Movie retrieved successfully.',
    type: MovieReturnModel,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized.',
    type: UnauthorizedModel,
  })
  @ApiNotFoundResponse({ description: 'Movie not found.', type: NotFoundModel })
  async show(@Param('id', ParseIntPipe) id: number) {
    return this.movieService.show(id);
  }

  @Post('create')
  @ApiBearerAuth()
  @ApiCreatedResponse({
    description: 'Movie created successfully.',
    type: MovieReturnModel,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized.',
    type: UnauthorizedModel,
  })
  @ApiBadRequestResponse({
    description: 'Bad request.',
    type: ValildationModel,
  })
  @UseGuards(AdminGuard)
  async create(@Body() body: CreateMovieDto) {
    return this.movieService.create(body);
  }

  @Put(':id')
  @ApiBearerAuth()
  @UseGuards(AdminGuard)
  @ApiOkResponse({
    description: 'Movie updated successfully.',
    type: UpdateModelResponse,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized.',
    type: UnauthorizedModel,
  })
  @ApiNotFoundResponse({ description: 'Movie not found.', type: NotFoundModel })
  @ApiBadRequestResponse({
    description: 'Bad request.',
    type: ValildationModel,
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateMovieDto,
  ) {
    return this.movieService.update(id, body);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Movie deleted successfully.',
    type: DeleteModelResponse,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized.',
    type: UnauthorizedModel,
  })
  @ApiNotFoundResponse({ description: 'Movie not found.', type: NotFoundModel })
  @ApiBadRequestResponse({
    description: 'Bad request.',
    type: ValildationModel,
  })
  @UseGuards(AdminGuard)
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.movieService.delete(id);
  }
}
