import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { TasksModule } from './modules/tasks/tasks.module';

@Module({
  imports: [AuthModule, PrismaModule, TasksModule],
})
export class AppModule {}
