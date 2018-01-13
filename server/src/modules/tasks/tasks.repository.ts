import { Component } from "@nestjs/common";
import { Repository } from "../../db/repository";
import { Task } from "../../db/model";

@Component()
export class TasksRepository extends Repository<Task> {
    public constructor() {
        super("tasks");
    }

    public test():void{

    }
}