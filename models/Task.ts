import { Document, Schema, model, models } from "mongoose";
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
        require: false
    },
    status:{
        type: Number,
        require: true
    }
})

const Task = models.Product || model<ITask>("Task",taskSchema)

export default Task