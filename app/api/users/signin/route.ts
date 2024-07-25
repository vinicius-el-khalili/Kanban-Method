import { createToken } from "@/lib/createToken";
import dbConnect from "@/lib/dbConnect";
import User, { UserSchema } from "@/models/User";
import { MongoDocument } from "@/types/MongoDocument";
import { compare } from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
import validator from "validator";

export async function POST(req:NextRequest){
    await dbConnect()
    try{

        const {login,password}:{
            login:string,
            password:string
        } = await req.json()

        // input validation
        if(!login||!password){
            return NextResponse.json("Partial content: all fields must be filled",{status:206})
        }

        // check user existence
        const user:UserSchema&MongoDocument|null = await User.findOne({login})
        if(!user){
            return NextResponse.json("Forbidden: login not found",{status:403})
        }

        // compare passwords
        const match = await compare(password,user.password)
        if (!match){
            return NextResponse.json("Unauthorized: incorrect password",{status:401})
        }
        
        // create token
        const token = createToken(user._id)
        console.log(user)
        return NextResponse.json({user,token})

    }catch(err:any){
        NextResponse.json({error:err.message},{status:500})
    }
}