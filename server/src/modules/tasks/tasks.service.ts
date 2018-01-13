import { Component } from "@nestjs/common";
import { ObjectId } from "mongodb";
import { TaskDto, TaskType } from "../../../../common/dto/task.dto";
import { Task } from "../../db/model";
import { TasksRepository } from "./tasks.repository";

@Component()
export class TasksService {
  public constructor(private readonly repository: TasksRepository){
  }

  public create(dto: TaskDto): Promise<TaskDto> {
    let task = this.convertFromDto(dto);
    return this.repository.add(task)
      .then(task => this.convertToDto(task));
  }

  public findAll(): Promise<TaskDto[]> {
    return this.repository.findAll({})
      .then((res) => res.map(item => this.convertToDto(item)));
  }

  public update(id: string, dto: TaskDto): Promise<TaskDto> {
    let task = this.convertFromDto(dto);
    return this.repository.update(id, task)
      .then(task => this.convertToDto(task));
  }

  public remove(id: string): Promise<void> {
    return this.repository.remove(id);
  }

  private convertFromDto(dto: TaskDto): Task {
    return {
      _id: dto.id != null ? new ObjectId(dto.id) : null,
      content: dto.content,
      type: dto.type.toString()
    };
  }

  private convertToDto(task: Task): TaskDto {
    return {
      id: task._id.toHexString(),
      content: task.content,
      type: TaskType[task.type],
      isDone: task.isDone,
      priority: 0
    }
  }
}
