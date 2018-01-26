import { Controller, Get, Post, Put, Delete, Body, Param, Query } from "@nestjs/common";
import * as moment from "moment";
import { TasksService, TasksSearchCriteria } from "./tasks.service";
import { TaskDto } from "../../../../common/dto/task.dto";
import { isNullOrUndefined } from "util";

@Controller("tasks")
export class TasksController {
  constructor(private readonly tasksService: TasksService) { }

  @Post()
  public async create(@Body() task: TaskDto): Promise<TaskDto> {
    return this.tasksService.create(task)
      .then((dto) => {
        console.log("new task created");
        return dto;
      });
  }

  @Get()
  public async findAll(@Query() query: TasksSearchQuery): Promise<TaskDto[]> {
    let search: TasksSearchCriteria = {};

    if(!isNullOrUndefined(query.from)) {
      let parsed = moment(query.from, "DD-MM-YYYY");
      if(!parsed.isValid()){
        throw "Invalid date format 'DD-MM-YYYY' for parameter 'from'";
      }
      search.from = parsed.toDate();
    }

    if(!isNullOrUndefined(query.to)) {
      let parsed = moment(query.to, "DD-MM-YYYY");
      if(!parsed.isValid()){
        throw "Invalid date format 'DD-MM-YYYY' for parameter 'to'";
      }
      search.to = parsed.toDate();
    }

    return this.tasksService.findAll(search)
      .then((result) => {
        console.log(`'${result.length}' tasks returned`);
        return result;
      });
  }

  @Put(":id")
  public async update(@Param() params: TaskQuery, @Body() task: TaskDto): Promise<TaskDto> {
    return this.tasksService.update(params.id, task)
      .then((dto) => {
        console.log("task updated");
        return dto;
      });
  }

  @Delete(":id")
  public async remove(@Param() params: TaskQuery) {
    return this.tasksService.remove(params.id)
      .then(() => console.log("task deleted"));
  }

  @Post("do/:id")
  public async do(@Param() params: TaskQuery, @Query() query: TodoQuery) {
    if(isNullOrUndefined(query.date)) {
      throw "Parameter 'date' is required";
    }

    let parsed = moment(query.date, "DD-MM-YYYY");
    if(!parsed.isValid()){
      throw "Invalid date format 'DD-MM-YYYY' for parameter 'date'";
    }

    return this.tasksService.toggle(params.id, parsed.toDate(), true)
      .then(() => console.log("task done"));
  }

  @Post("undo/:id")
  public async undo(@Param() params: TaskQuery, @Query() query: TodoQuery) {
    if(isNullOrUndefined(query.date)) {
      throw "Parameter 'date' is required";
    }

    let parsed = moment(query.date, "DD-MM-YYYY");
    if(!parsed.isValid()){
      throw "Invalid date format 'DD-MM-YYYY' for parameter 'date'";
    }

    return this.tasksService.toggle(params.id, parsed.toDate(), false)
      .then(() => console.log("task undone"));
  }
}

export interface TasksSearchQuery {
  from?: string,
  to?: string
}

export interface TodoQuery {
  date?: string
}

export interface TaskQuery {
  id?: string
}
