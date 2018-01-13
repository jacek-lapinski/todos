import { ObjectId } from "mongodb";

export interface Entity {
    _id?: ObjectId,
    createTime?: Date,
    updateTime?: Date
}

export interface Task extends Entity {
    content: string,
    type: string,
    isDone?: boolean,
}

