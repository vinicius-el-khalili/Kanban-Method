import dbConnect from "@/lib/dbConnect";
import Task from "@/models/Task";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    await dbConnect()
    try{ 
        const tasks = await Task.find({})    
        return NextResponse.json(tasks)   
    }catch(err:any){
        return NextResponse.json({error:err.message})
    }
}

export async function POST(req:NextRequest) {
    await dbConnect()
    try{ 
        
        const {title,user_id,contributors}:{
            user_id:string,
            title:string,
            contributors:string[]
        } = await req.json()
        
        const task = await Task.create({
            user_id,
            title,
            status:0,
            contributors
        })
        
        return NextResponse.json({task},{status:200})

    }catch(err:any){
        return NextResponse.json({error:err.message})
    }
}