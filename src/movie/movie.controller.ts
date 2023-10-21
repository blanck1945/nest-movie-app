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

@Controller('/movies')
export class MovieController {
  constructor(private movieService: MovieService) {}

  @Get()
  async index() {
    return this.movieService.index();
  }

  @Get(':id')
  @UseGuards(UserGuard)
  async show(@Param('id', ParseIntPipe) id: number) {
    return this.movieService.show(id);
  }

  @Post('create')
  @UseGuards(AdminGuard)
  async create(@Body() body: CreateMovieDto) {
    return this.movieService.create(body);
  }

  @Put(':id')
  @UseGuards(AdminGuard)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateMovieDto,
  ) {
    return this.movieService.update(id, body);
  }

  @Put('soft')
  @UseGuards(AdminGuard)
  async softDelete(@Body() body) {
    return this.movieService.softDelete(body);
  }

  @Put('restore')
  @UseGuards(AdminGuard)
  async restore(@Body() body) {
    return this.movieService.restore(body);
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.movieService.delete(id);
  }
}
