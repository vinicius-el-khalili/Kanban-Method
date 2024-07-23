import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {

    await dbConnect()
    try {

        const users = await User.find({})
        return NextResponse.json(users)

    }catch(err:any){
        return NextResponse.json({error:err.message},{status:500})
    }

}

export async function POST(req:NextRequest){
    await dbConnect()
    try {

        const {email,password,name}:{
            email:string,
            password:string,
            name:string
        } = await req.json()

        const user = await User.create({
            email,
            password,
            name
        })

        return NextResponse.json(user)

    }catch(err:any){
        return NextResponse.json({error:err.message},{status:500})
    }
}