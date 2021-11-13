import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../common/guards/auth.guard';

@Controller('tasks')
export class TasksController {
  @Get()
  @UseGuards(AuthGuard)
  getAll() {
    return [];
  }
}
