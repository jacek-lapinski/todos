import { Controller, Get, Post, Body } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { TaskDto } from "../../../../common/dto/task.dto";

@Controller("tasks")
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  public async create(@Body() task: TaskDto) {
    this.tasksService.create(task);
  }

  @Get()
  public async findAll(): Promise<TaskDto[]> {
    return this.tasksService.findAll();
  }
}
