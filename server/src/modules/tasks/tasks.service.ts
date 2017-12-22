import { Component } from "@nestjs/common";
import { TaskDto } from "../../../../common/dto/task.dto";

@Component()
export class TasksService {
  private readonly tasks: TaskDto[] = [];

  public create(task: TaskDto): void {
    this.tasks.push(task);
  }

  public findAll(): TaskDto[] {
    return this.tasks;
  }
}
