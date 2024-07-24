import dbConnect from "@/lib/dbConnect";
import Task from "@/models/Task";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest,{params}:{params:{taskId:string}}){

    const {taskId} = params
    await dbConnect()
    try{

        const task = await Task.findById(taskId)
        return NextResponse.json(task)
    
    }catch(err:any){
        return NextResponse.json({error:err.message},{status:500})
    }

}

export async function PATCH(req:NextRequest,{params}:{params:{taskId:string}}) {
    
    const {taskId} = params
    await dbConnect()
    try{

        const update:{
            title?:string,
            status?:number,
            contributors?:string[]
        } = await req.json()

        const task = await Task.updateOne({_id:taskId},{$set:update})
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