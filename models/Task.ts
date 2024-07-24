import { Document, ObjectId, Schema, model, models } from "mongoose";
export interface ITask extends Document {
    user_id: string,
    project_id: string
    title: string,
    status: number,
    contributors:ObjectId[],
}

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
        type: [String],
        require: true
    },
})

const Task = models.Task || model<ITask>("Task",taskSchema)

export default Task