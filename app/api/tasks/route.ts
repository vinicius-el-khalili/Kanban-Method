import dbConnect from "@/lib/dbConnect";
import Task from "@/models/Task";
import { NextRequest, NextResponse } from "next/server";

function tryCatch (f:any) {
    try{ 
        f()    
    }catch(err:any){
        return NextResponse.json({error:err.message})
    }
}

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
        
        const {title,description,status}:{
            title:string,
            description:string|undefined,
            status:number
        } = await req.json()
        
        const task = await Task.create({title,description,status})
        return NextResponse.json({task},{status:200})

    }catch(err:any){
        return NextResponse.json({error:err.message})
    }
}