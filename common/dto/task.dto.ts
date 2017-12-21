import { Dto } from "./dto";

export enum TaskType {
    Single,
    Daily
}

export interface TaskDto extends Dto {
    content: string,
    type: TaskType,
    priority: number,
    isDone: boolean
}