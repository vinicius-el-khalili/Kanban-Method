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