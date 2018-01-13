import { Action } from "../actions/Action";
import * as TasksConstants from "../constants/TasksConstants";
import { TaskDto } from "../../../../common/dto/task.dto";

export const tasks = (state: TaskDto[], action: Action): TaskDto[] => {
    switch(action.type){
        case TasksConstants.ADD_NEW_TASK:
            return [...state, action.data];
        case TasksConstants.DELETE_TASK:
            return state.filter(item => item.id !== action.data.id);
        case TasksConstants.UPDATE_TASK:
            return state.map(item => item.id == action.data.id ? action.data : item);
        case TasksConstants.RECEIVED_TASKS:
            return action.data;
        default:
            return state;
    }
};