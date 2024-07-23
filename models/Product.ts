import { Document, Schema, model } from "mongoose";
export interface ITask extends Document {
    title: string,
    description: string,
    status: number
}

const taskSchema = new Schema({
    title:{
        type: String,
        require: true
    },
    description:{
        type: String,
        require: true
    },
    status:{
        type: Number,
        require: false
    }
})

const Task = model<ITask>("Task",taskSchema)

export default Task