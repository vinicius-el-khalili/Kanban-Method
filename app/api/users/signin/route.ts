import { createToken } from "@/lib/createToken";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { compare } from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
import validator from "validator";

export async function POST(req:NextRequest){
    await dbConnect()
    try{

        const {email,password}:{
            email:string,
            password:string
        } = await req.json()

        // input validation
        if(!email||!password){
            return NextResponse.json("Partial content: all fields must be filled",{status:206})
        }
        if(!validator.isEmail(email)){
            return NextResponse.json("Precondition failed: invalid email",{status:412})
        }

        // check user existence
        const user = await User.findOne({email})
        if(!user){
            return NextResponse.json("Forbidden: email not found",{status:403})
        }

        // compare passwords
        const match = await compare(password,user.password)
        if (!match){
            return NextResponse.json("Unauthorized: incorrect password",{status:401})
        }
        
        // create token
        const token = createToken(user._id)
        return NextResponse.json({user,token},{status:200})

    }catch(err:any){
        NextResponse.json({error:err.message},{status:500})
    }
}