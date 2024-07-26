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
        const currentProject:ProjectSchema&MongoDocument|null = await Project.findById(updatedProject._id)
        if (!currentProject){
            return NextResponse.json("Project not found",{status:400})
        }
        if(updatedProject.user_id!=currentProject.user_id){
            return NextResponse.json("can't update user id",{status:401})
        }

        // check for duplicated contributors
        const updatedContributors = currentProject.contributors.map(c=>c.user_id)
        if(new Set(updatedContributors).size != updatedContributors.length){
            return NextResponse.json("contributor already added",{status:402})
        }

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