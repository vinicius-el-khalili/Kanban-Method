import { Document, ObjectId, Schema, model, models } from "mongoose";
import { Contributor, contributorSchema } from "./Project";

export type TaskSchema = {
    user_id: string,
    project_id: string
    title: string,
    status: number,
    contributors:Contributor[],
}

export interface ITask extends Document,TaskSchema {}

const taskSchema = new Schema ({
    user_id:{
        type: String,
        require: true,
    },
    project_id:{
        type:String,
        require: true
    },
    title:{
        type: String,
        require: true
    },
    status:{
        type: Number,
        require: true
    },
    contributors:{
        type: [contributorSchema],
        require: true
    },
})

const Task = models.Task || model<ITask>("Task",taskSchema)

export default Task