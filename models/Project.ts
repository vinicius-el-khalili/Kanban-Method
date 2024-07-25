import { Document, Schema, model, models } from "mongoose";

export type Contributor = {
    user_id: string,
    username: string,
    avatar: number,
    color: number,
}

export const contributorSchema = new Schema({
    user_id: {
        type: String,
        require: true
    },
    username: {
        type: String,
        require: true
    },
    avatar: {
        type: Number,
        require: true
    },
    color: {
        type: Number,
        require: true
    }
})

export type ProjectSchema = {
    user_id: string,
    title: string,
    contributors: Contributor[]
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
        type: [contributorSchema],
        require: true
    },
})

const Project = models.Project || model<IProject>("Project",projectSchema)

export default Project