import * as TaskConstants from "../constants/TasksConstants";
import { Action } from "./Action";
import { TaskDto } from "../../../../common/dto/task.dto";

export function addTask(task: TaskDto): Action {
    return {
        type: TaskConstants.ADD_NEW_TASK,
        data: task
    }
}

export function updateTask(task: TaskDto): Action {
    return {
        type: TaskConstants.UPDATE_TASK,
        data: task
    }
}

export function deleteTask(task: TaskDto): Action {
    return {
        type: TaskConstants.DELETE_TASK,
        data: task
    }
}

export function receivedTasks(tasks: TaskDto[]): Action {
    return {
        type: TaskConstants.RECEIVED_TASKS,
        data: tasks
    }
}