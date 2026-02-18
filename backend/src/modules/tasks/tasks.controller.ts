import {
  Body,
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Request,
  UseGuards,
  Put,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { AuthGuard } from '../auth/auth.guard';
import { TaskDTO } from './dtos/auth';

@Controller('tasks')
@UseGuards(AuthGuard)
export class TasksController {
  constructor(private readonly service: TasksService) {}

  @Get()
  async listAll(@Request() req) {
    return this.service.listAll({ userId: req.user.id });
  }

  @Get(':id')
  async getOne(@Param('id') id: string, @Request() req) {
    return this.service.getOne({ id, userId: req.user.id });
  }

  @Post()
  async create(@Body() taskDto: TaskDTO, @Request() req) {
    return this.service.create({ ...taskDto, userId: req.user.id });
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() taskDto: Partial<TaskDTO>,
    @Request() req,
  ) {
    return this.service.update(id, req.user.id, taskDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Request() req) {
    return this.service.delete(id, req.user.id);
  }
}
