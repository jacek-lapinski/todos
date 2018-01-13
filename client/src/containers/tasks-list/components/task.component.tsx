import { Component, ReactNode } from "react";
import { TaskDto } from "../../../../../common/dto/task.dto";

interface TaskItemProps {
    task: TaskDto
}

export class TaskItem extends Component<TaskItemProps> {
    public render(): ReactNode {
        return <div>
            {this.props.task.content}
        </div>;
    }
}