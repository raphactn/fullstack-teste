import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { TaskStatus } from '@prisma/client';
import { TaskDTO } from './dtos/auth';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async listAll({ userId }: { userId: string }) {
    return await this.prisma.tasks.findMany({
      where: { userId },
      orderBy: { updatedAt: 'desc' },
    });
  }

  async getOne({ id, userId }: { id: string; userId: string }) {
    const task = await this.prisma.tasks.findUnique({
      where: { id },
    });

    if (!task) throw new NotFoundException('Task not found');
    if (task.userId !== userId) throw new UnauthorizedException();

    return task;
  }

  async create(taskDto: TaskDTO) {
    const existing = await this.prisma.tasks.findFirst({
      where: { title: taskDto.title, userId: taskDto.userId },
    });
    if (existing) throw new ConflictException('Task title already exists');

    return this.prisma.tasks.create({
      data: {
        ...taskDto,
        status: taskDto.status || TaskStatus.PENDING,
        createdAt: taskDto.createdAt || new Date(),
        endAt: taskDto.endAt || null,
      },
    });
  }

  async update(id: string, userId: string, taskDto: Partial<TaskDTO>) {
    const task = await this.prisma.tasks.findUnique({ where: { id } });
    if (!task) throw new NotFoundException('Task not found');
    if (task.userId !== userId) throw new UnauthorizedException();

    return this.prisma.tasks.update({
      where: { id },
      data: {
        ...taskDto,
        updatedAt: new Date(),
      },
    });
  }

  async delete(id: string, userId: string) {
    const task = await this.prisma.tasks.findUnique({ where: { id } });
    if (!task) throw new NotFoundException('Task not found');
    if (task.userId !== userId) throw new UnauthorizedException();

    await this.prisma.tasks.delete({ where: { id } });
    return { message: 'Task deleted successfully' };
  }
}
