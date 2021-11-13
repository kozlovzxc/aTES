import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TaskEntity } from './task.entity';
import { nanoid } from 'nanoid';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskEntity)
    private tasksRepository: Repository<TaskEntity>,
  ) {}

  getAll() {
    // TODO: add pagination
    return this.tasksRepository.find();
  }

  create({ title, description }: { title: string; description: string }) {
    const publicId = nanoid();
    return this.tasksRepository.save({
      publicId,
      title,
      description,
    });
  }
}
