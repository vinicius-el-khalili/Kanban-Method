import { sign } from "jsonwebtoken"

export const createToken = (_id:string) => {
    return sign({_id},process.env.SECRET!,{expiresIn:"1d"})
}