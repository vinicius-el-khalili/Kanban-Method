import { createToken } from "@/lib/createToken";
import dbConnect from "@/lib/dbConnect";
import { validateToken } from "@/lib/validateToken";
import User from "@/models/User";
import { JwtPayload, verify } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    await dbConnect()
    try{
        
        const {token}:{
            token:string,
        } = await req.json()

        const v = validateToken(token)
        if(!v){
            return NextResponse.json(false,{status:401})
        }
        const user_id = v._id
        const newToken = createToken(user_id)
        const user = await User.findById(user_id)

        return NextResponse.json({newToken,user})

    }catch(err:any){
        NextResponse.json({error:err.message},{status:500})
    }
}