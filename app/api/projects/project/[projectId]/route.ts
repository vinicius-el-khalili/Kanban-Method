import dbConnect from "@/lib/dbConnect";
import Project, { Contributor, ProjectSchema } from "@/models/Project";
import { MongoDocument } from "@/types/MongoDocument";
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
        
        const updatedProject:ProjectSchema&MongoDocument = await req.json()

        const project = await Project.updateOne({_id:projectId},{$set:updatedProject})
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