import { Document, Schema, model, models } from "mongoose";
import { MongoDocument } from "@/types/MongoDocument";

export type UserSchema = {
    email: string,
    password: string,
    username: string,
}

export interface IUser extends Document,UserSchema {}


const userSchema = new Schema ({
    email: {
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
        require: true
    }
})

const User = models.User || model<IUser>("User",userSchema)

export default User