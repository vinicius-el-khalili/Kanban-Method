import dbConnect from "@/lib/dbConnect";
import Project from "@/models/Project";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest,{params}:{params:{projectId:string}}){
    await dbConnect()
    try{

        const {projectId} = params
        const project = await Project.findById(projectId)
        return NextResponse.json(project)

    }catch(err:any){
        return NextResponse.json({error:err.message},{status:500})
    }
}

export async function PATCH(req:NextRequest,{params}:{params:{projectId:string}}){
    await dbConnect()
    try{

        const {projectId} = params
        
        const update:{
            title?:string,
            status?:number
            contributors?:string[]
        } = await req.json()

        const project = await Project.updateOne({_id:projectId},{$set:update})
        return NextResponse.json(project)
 
    }catch(err:any){
        return NextResponse.json({error:err.message},{status:500})
    }
}

export async function DELETE(req:NextRequest,{params}:{params:{projectId:string}}) {
    await dbConnect()
    try{

        const {projectId} = params
        await Project.deleteOne({_id:projectId})
        return NextResponse.json("ok")
 
    }catch(err:any){
        return NextResponse.json({error:err.message},{status:500})
    }
}