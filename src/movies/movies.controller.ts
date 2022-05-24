import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

@Controller('movies')
export class MoviesController {
  @Get()
  getAll() {
    return 'all movies';
  }

  @Get('search')
  search(@Query('year') searchingYear: string) {
    return `Searching...(${searchingYear})`;
  }

  @Get(':id')
  getOne(@Param('id') movieId: string) {
    return `movie: ${movieId}`;
  }

  @Post()
  create(@Body() movieData) {
    return movieData;
  }

  @Delete(':id')
  remove(@Param('id') movieId: string) {
    return `remove: ${movieId}`;
  }

  @Patch(':id')
  patch(@Param('id') movieId: string, @Body() updateData) {
    return {
      updatedMovie: movieId,
      ...updateData,
    };
  }
}
