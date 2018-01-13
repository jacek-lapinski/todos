import { Component, ReactNode } from "react";
import { connect, Dispatch } from "react-redux";
import { TaskDto } from "../../../../common/dto/task.dto";
import { createNewTask } from "../../services/tasks.service";
import { addTask } from "../../redux/actions/TasksActions";

interface AppenderProps {
    onTaskCreated: (task: TaskDto) => void
}

class AppenderComponent extends Component<AppenderProps> {

    public render(): ReactNode {
        return <form></form>
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