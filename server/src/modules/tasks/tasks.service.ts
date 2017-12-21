import { Component } from '@nestjs/common';
import { TaskDto } from '../../../../common/dto/task.dto';

@Component()
export class TasksService {
  private readonly tasks: TaskDto[] = [];

  create(task: TaskDto) {
    this.tasks.push(task);
  }

  findAll(): TaskDto[] {
    return this.tasks;
  }
}
