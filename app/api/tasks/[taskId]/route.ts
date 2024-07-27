import dbConnect from "@/lib/dbConnect";
import { validateTokenizedRequest } from "@/lib/validateToken";
import Task, { TaskSchema } from "@/models/Task";
import { MongoDocument } from "@/types/MongoDocument";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest,{params}:{params:{taskId:string}}){

    await dbConnect()
    try{

        const payload = validateTokenizedRequest(req)
        if(!payload){ return NextResponse.json("bad token",{status:400}) }
        const {taskId} = params

        // find task
        const task:TaskSchema&MongoDocument|null = await Task.findById(taskId)
        if(!task){ return NextResponse.json("task not found",{status:404}) }

        // check if user is owner/contributor
        const isOwner = task.user_id==payload._id
        const isContributor = task.contributors.some( c => c.user_id==payload._id )
        if(!isOwner&&!isContributor){ return NextResponse.json("unauthorized",{status:401}) }

        return NextResponse.json(task)
    
    }catch(err:any){

        return NextResponse.json({error:err.message},{status:500})
        
    }

}

export async function PATCH(req:NextRequest,{params}:{params:{taskId:string}}) {
    
    await dbConnect()
    try{

        const payload = validateTokenizedRequest(req)
        if(!payload){ return NextResponse.json("bad token",{status:400}) }
        const {taskId} = params
        
        const updatedTask:TaskSchema = await req.json()
        const task = await Task.updateOne({_id:taskId},{
            $set:{
                status:updatedTask.status,
            }
        })
        return NextResponse.json(task)

    }catch(err:any){

        return NextResponse.json({error:err.message},{status:500})
        
    }

}

export async function DELETE(req:NextRequest,{params}:{params:{taskId:string}}){

    const {taskId} = params
    await dbConnect()
    try{

        await Task.deleteOne({_id:taskId})
        return NextResponse.json("ok")
    
    }catch(err:any){
        return NextResponse.json({error:err.message},{status:500})
    }

}