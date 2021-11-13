import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../common/guards/auth.guard';
import { TasksService } from './tasks.service';
import { IsString } from 'class-validator';

class CreateDTO {
  @IsString()
  title: string;

  @IsString()
  description: string;
}

@Controller('tasks')
@UseGuards(AuthGuard)
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAll() {
    return this.tasksService.getAll();
  }

  @Post()
  create(@Body() body: CreateDTO) {
    return this.tasksService.create({
      title: body.title,
      description: body.description,
    });
  }
}
