import { TaskStatus } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsDate,
  IsEnum,
  IsOptional,
  IsUUID,
  IsString,
} from 'class-validator';

import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';

export class TaskDTO {
  @ApiProperty({
    example: 'Implementar autenticação JWT',
    description: 'Título da tarefa',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    example: 'Criar sistema de login usando access token',
    description: 'Descrição detalhada da tarefa',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiPropertyOptional({
    enum: TaskStatus,
    example: TaskStatus.IN_PROGRESS,
    description: 'Status atual da tarefa',
  })
  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;

  @ApiPropertyOptional({
    example: '2026-03-10T14:00:00.000Z',
    description: 'Data limite da tarefa',
    type: String,
    format: 'date-time',
  })
  @Type(() => Date)
  @IsDate()
  @IsOptional()
  endAt?: Date;

  @ApiPropertyOptional({
    example: '2026-02-18T10:00:00.000Z',
    description: 'Data de criação da tarefa',
    type: String,
    format: 'date-time',
  })
  @Type(() => Date)
  @IsDate()
  @IsOptional()
  createdAt?: Date;

  @ApiProperty({
    example: 'a3bb189e-8bf9-3888-9912-ace4e6543002',
    description: 'ID do usuário dono da tarefa',
  })
  @IsNotEmpty()
  @IsUUID()
  userId: string;
}

export class TaskResponseDTO {
  @ApiProperty({
    example: 'b3f6a6c2-7f6b-4c1a-9c6e-12fdf4f6b999',
  })
  id: string;

  @ApiProperty({
    example: 'Implementar Swagger',
  })
  title: string;

  @ApiProperty({
    example: 'Adicionar documentação profissional na API',
  })
  description: string;

  @ApiProperty({
    enum: TaskStatus,
    example: TaskStatus.IN_PROGRESS,
  })
  status: TaskStatus;

  @ApiProperty({
    example: '2026-03-01T10:00:00.000Z',
    nullable: true,
  })
  endAt?: Date;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

class MetaDTO {
  @ApiProperty() total: number;
  @ApiProperty() page: number;
  @ApiProperty() limit: number;
  @ApiProperty() totalPages: number;
  @ApiProperty() hasNextPage: boolean;
}

export class PaginatedTasksDTO {
  @ApiProperty({
    type: TaskResponseDTO,
    isArray: true,
  })
  data: TaskResponseDTO[];

  @ApiProperty({
    type: MetaDTO,
  })
  meta: MetaDTO;
}

export class UpdateTaskDTO extends PartialType(TaskDTO) {}
