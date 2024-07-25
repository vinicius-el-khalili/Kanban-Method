import { Document, Schema, model, models } from "mongoose";

export type UserSchema = {
    login: string,
    password: string,
    username: string,
    avatar: number,
    color: number,
    friends: string[]
}

export interface IUser extends Document,UserSchema {}


const userSchema = new Schema ({
    login: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    username: {
        type: String,
        require: true,
        unique: true
    },
    avatar: {
        type: Number,
        default: 0,
        require: true
    },
    color: {
        type: Number,
        default: 0,
        require: true
    },
    friends: {
        type: [String],
        default:[],
        require: true
    }
})

const User = models.User || model<IUser>("User",userSchema)

export default User