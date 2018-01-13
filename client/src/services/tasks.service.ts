import { get, post, put, del } from "web-request";
import { TaskDto } from "../../../common/dto/task.dto";
import { config } from "../utils/config.provider";

const tasksApiUrl: string = `${config.serverUrl}/tasks`;

export function getAll(): Promise<TaskDto[]> {
    return get(tasksApiUrl)
        .then(response => <TaskDto[]>JSON.parse(response.content));
}

export function createNewTask(task: TaskDto): Promise<TaskDto> {
    return post(tasksApiUrl, null, task)
        .then(response => <TaskDto>JSON.parse(response.content));
}

export function updateTask(task: TaskDto): Promise<TaskDto> {
    return put(`${tasksApiUrl}/${task.id}`, null, task)
        .then(response => <TaskDto>JSON.parse(response.content));
}

export function deleteTask(task: TaskDto): Promise<void> {
    return del(`${tasksApiUrl}/${task.id}`)
        .then(response => {});
}
