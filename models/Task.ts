import { Document, ObjectId, Schema, model, models } from "mongoose";
export interface ITask extends Document {
    title: string,
    description: string,
    status: number,
    project_id: ObjectId,
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
    project_id:{
        type: Schema.Types.ObjectId,
        require: true,
    },
    contributors:{
        type: [Schema.Types.ObjectId],
        require: true
    },
})

const Task = models.Task || model<ITask>("Task",taskSchema)

export default Task