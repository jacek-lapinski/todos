import { Controller, Get, Post, Put, Delete, Body, Param } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { TaskDto } from "../../../../common/dto/task.dto";

@Controller("tasks")
export class TasksController {
  constructor(private readonly tasksService: TasksService) { }

  @Post()
  public async create( @Body() task: TaskDto): Promise<TaskDto> {
    return this.tasksService.create(task)
      .then((dto) => {
        console.log("new task created");
        return dto;
      });
  }

  @Get()
  public async findAll(): Promise<TaskDto[]> {
    return this.tasksService.findAll()
      .then((result) => {
        console.log(`'${result.length}' tasks returned`);
        return result;
      });
  }

  @Put(":id")
  public async update( @Param() params, @Body() task: TaskDto): Promise<TaskDto> {
    return this.tasksService.update(params.id, task)
      .then((dto) => {
        console.log("task updated");
        return dto;
      });
  }

  @Delete(":id")
  public async remove( @Param() params) {
    return this.tasksService.remove(params.id)
      .then(() => console.log("task deleted"));
  }
}
