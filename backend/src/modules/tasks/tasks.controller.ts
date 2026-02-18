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
  Query,
} from '@nestjs/common';

import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiUnauthorizedResponse,
  ApiConflictResponse,
  ApiQuery,
} from '@nestjs/swagger';

import { TasksService } from './tasks.service';
import { AuthGuard } from '../auth/auth.guard';
import {
  PaginatedTasksDTO,
  TaskDTO,
  TaskResponseDTO,
  UpdateTaskDTO,
} from './dtos/auth';

@ApiTags('Tasks')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly service: TasksService) {}

  @Get()
  @ApiOperation({ summary: 'Listar tarefas com paginação' })
  @ApiOkResponse({
    description: 'Lista de tarefas retornada com sucesso',
    type: PaginatedTasksDTO,
  })
  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  async listAll(
    @Request() req,
    @Query('search') search?: string,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ) {
    return this.service.listAll({
      userId: req.user.id,
      search,
      page: Number(page),
      limit: Number(limit),
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar tarefa por ID' })
  @ApiOkResponse({
    type: TaskResponseDTO,
  })
  @ApiNotFoundResponse({
    description: 'Task not found',
  })
  @ApiUnauthorizedResponse()
  async getOne(@Param('id') id: string, @Request() req) {
    return this.service.getOne({ id, userId: req.user.id });
  }

  @Post()
  @ApiOperation({ summary: 'Criar nova tarefa' })
  @ApiCreatedResponse({
    type: TaskResponseDTO,
  })
  @ApiConflictResponse({
    description: 'Task title already exists',
  })
  async create(@Body() taskDto: TaskDTO, @Request() req) {
    return this.service.create({ ...taskDto, userId: req.user.id });
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar tarefa' })
  @ApiOkResponse({
    type: TaskResponseDTO,
  })
  @ApiNotFoundResponse()
  async update(
    @Param('id') id: string,
    @Body() taskDto: UpdateTaskDTO,
    @Request() req,
  ) {
    return this.service.update(id, req.user.id, taskDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar tarefa' })
  @ApiOkResponse({
    schema: {
      example: {
        message: 'Task deleted successfully',
      },
    },
  })
  async delete(@Param('id') id: string, @Request() req) {
    return this.service.delete(id, req.user.id);
  }
}
