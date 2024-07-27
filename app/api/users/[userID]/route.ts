import dbConnect from "@/lib/dbConnect";
import { validateTokenizedRequest } from "@/lib/validateToken";
import { Contributor } from "@/models/Project";
import User, { UserSchema } from "@/models/User";
import { MongoDocument } from "@/types/MongoDocument";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest,{params}:{params:{userID:string}}){

    await dbConnect()
    try{

        const payload = validateTokenizedRequest(req)
        if(!payload){ return NextResponse.json("bad token",{status:400}) }
        const {userID} = params
        
        const user:UserSchema&MongoDocument|null = await User.findById(userID)
        if(!user){
            return NextResponse.json("Forbidden: login not found",{status:403})
        }
        const contributor:Contributor = {
            user_id: user._id,
            username: user.username,
            avatar: user.avatar,
            color: user.color
        }
        return NextResponse.json(contributor)

    }catch(err:any){
        return NextResponse.json({error:err.message},{status:500})
    }


}