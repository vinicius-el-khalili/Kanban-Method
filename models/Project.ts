import { Document, ObjectId, Schema, model, models } from "mongoose";
export interface IProject extends Document {
    title: string,
    adminId: ObjectId,
    contributors: ObjectId[]
}

const projectSchema = new Schema({
    title:{
        type: String,
        require: true
    },
    admin_id:{
        type: String,
        require: true
    },
    contributors:{
        type: [String],
        require: true
    },
})


const Project = models.Project || model<IProject>("Project",projectSchema)

export default Project