import dbConnect from "@/lib/dbConnect";
import Task, { TaskSchema } from "@/models/Task";
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
        
        const newTask:TaskSchema = await req.json()
        const task = await Task.create(newTask)
        return NextResponse.json(task)

    }catch(err:any){
        return NextResponse.json({error:err.message})
    }
}