import { JwtPayload, verify } from "jsonwebtoken"

export const validateToken = (token:string) => {
    try {

        const verifiedToken:string|JwtPayload = verify(token,process.env.SECRET!)
        if(!verifiedToken||typeof(verifiedToken)=="string"){
            return false
        }
        const _id:string = verifiedToken._id
        return {_id}
    } catch {
        return false
    }
}