import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { AuthGuardModule } from '../common/guards/auth-guard.module';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from './task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity]), AuthGuardModule],
  providers: [TasksService],
  controllers: [TasksController],
})
export class TasksModule {}
