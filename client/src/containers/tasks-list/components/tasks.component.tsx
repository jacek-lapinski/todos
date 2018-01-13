import { Component, ReactNode } from "react";
import { TaskDto } from "../../../../../common/dto/task.dto";
import { TaskItem } from "./task.component";

interface TasksItemProps {
    tasks: TaskDto[]
}

export class TasksList extends Component<TasksItemProps> {
    public render(): ReactNode {
        return <ul>
            {this.props.tasks.map(task => {
                <li>
                    <TaskItem task={task}></TaskItem>
                </li>
            })}
        </ul>
    }
}