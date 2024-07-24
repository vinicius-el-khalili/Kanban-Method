import { createToken } from "@/lib/createToken";
import dbConnect from "@/lib/dbConnect";
import User, { UserSchema } from "@/models/User";
import { MongoDocument } from "@/types/MongoDocument";
import { genSalt, hash } from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
import validator from "validator";

export async function POST(req:NextRequest) {
    await dbConnect()
    try{

        const {email,password,username}:{
            email:string,
            password:string,
            username:string
        } = await req.json()

        // input validation
        if(!email||!password||!username){
            return NextResponse.json("Partial content: all fields must be filled",{status:206})
        }
        if(!validator.isEmail(email)){
            return NextResponse.json("Precondition failed: invalid email",{status:412})
        }
        if(!validator.isStrongPassword(password)){
            return NextResponse.json("Precondition failed: weak password",{status:412})
        }

        // check user existence
        const exists = await User.findOne({email})   
        if(exists){
            return NextResponse.json("Conflict: email already in use",{status:409})
        }        

        // hash password
        const salt = await genSalt()
        const Hash = await hash(password,salt)

        // create user
        const user:UserSchema&MongoDocument = await User.create({
            email,
            password:Hash,
            username
        })

        // create token
        const token = createToken(user._id)

        return NextResponse.json({user,token})

    }catch(err:any){
        return NextResponse.json({error:err.message},{status:500})
    }
}