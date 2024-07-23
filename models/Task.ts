import { Document, ObjectId, Schema, model, models } from "mongoose";
export interface ITask extends Document {
    title: string,
    description: string,
    status: number,
    user_id: ObjectId,
    contributors:ObjectId[],
}

const taskSchema = new Schema ({
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
    },
    user_id:{
        type: String,
        require: true,
    },
    contributors:{
        type: [String],
        require: true
    },
})

const Task = models.Task || model<ITask>("Task",taskSchema)

export default Task