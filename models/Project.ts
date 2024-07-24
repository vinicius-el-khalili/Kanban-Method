import { Document, Schema, model, models } from "mongoose";

export type ProjectSchema = {
    user_id: string,
    title: string,
    contributors: [string,string][]
}
export interface IProject extends Document,ProjectSchema {}

const projectSchema = new Schema({
    user_id:{
        type: String,
        require: true
    },
    title:{
        type: String,
        require: true
    },
    contributors:{
        type: [[String,String]],
        require: true
    },
})


const Project = models.Project || model<IProject>("Project",projectSchema)

export default Project