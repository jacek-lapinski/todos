import { Component, ReactNode } from "react";
import { connect, Dispatch } from "react-redux";
import { TaskDto } from "../../../../common/dto/task.dto";
import { TasksList } from "./components/tasks.component";
import { getAll } from "../../services/tasks.service";
import { receivedTasks } from "../../redux/actions/TasksActions";

interface TasksListProps {
    tasks: TaskDto[],
    onTasksReceived: (tasks: TaskDto[]) => void
}

class TasksListComponent extends Component<TasksListProps> {

    public render(): ReactNode {
        return <TasksList tasks={this.props.tasks}></TasksList>
    }

    public componentDidMount(): void {
        getAll()
            .then(tasks => this.props.onTasksReceived(tasks))
            .catch(err => alert(err));
    }
}

const mapStateToProps = (state: any) => {
    return {
        tasks: state.tasks
    };
};

const mapDispatchToProps = (dispatch: Dispatch<{}>) => {
    return {
        onTasksReceived: (tasks: TaskDto[]) => {
            dispatch(receivedTasks(tasks));
        }
    };
};

const Tasks = connect(
    mapStateToProps,
    mapDispatchToProps
)(TasksListComponent);

export default Tasks;