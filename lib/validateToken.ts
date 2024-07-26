import { JwtPayload, verify } from "jsonwebtoken"
import { NextRequest } from "next/server"

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

export const validateTokenizedRequest = (req:NextRequest) => {

    const authHeader = req.headers.get("Authorization")
    if(!authHeader){ return false }
    const token = authHeader.split(" ")[1]
    const validation = validateToken(token)
    if(!validation){ return false }
    return validation

}