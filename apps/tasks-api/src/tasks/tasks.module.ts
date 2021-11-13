import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { AuthGuardModule } from '../common/guards/auth-guard.module';

@Module({
  imports: [AuthGuardModule],
  controllers: [TasksController],
})
export class TasksModule {}
