import { Document, Schema, model, models } from "mongoose";

export interface IUser extends Document {
    email: string,
    password: string,
    name: string,
}

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
    name: {
        type: String,
        require: true
    }
})

const User = models.User || model<IUser>("User",userSchema)

export default User