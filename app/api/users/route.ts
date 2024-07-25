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

        type Body = {
            login:string,
            password:string,
            name:string
        }

        const {login,password,name}:Body = await req.json()

        const user = await User.create({
            login,
            password,
            name
        })

        return NextResponse.json(user)

    }catch(err:any){
        return NextResponse.json({error:err.message},{status:500})
    }
}