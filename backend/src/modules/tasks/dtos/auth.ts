import { TaskStatus } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsDate,
  IsEnum,
  IsOptional,
  IsUUID,
} from 'class-validator';

export class TaskDTO {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  endAt?: Date;

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  createdAt?: Date;

  @IsNotEmpty()
  @IsUUID()
  userId: string;
}
