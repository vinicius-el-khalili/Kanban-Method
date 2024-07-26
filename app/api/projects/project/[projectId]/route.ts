import dbConnect from "@/lib/dbConnect";
import { validateTokenizedRequest } from "@/lib/validateToken";
import Project, { Contributor, ProjectSchema } from "@/models/Project";
import { MongoDocument } from "@/types/MongoDocument";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest,{params}:{params:{projectId:string}}){
    await dbConnect()
    try{ // GET Project by id
        
        const validation = validateTokenizedRequest(req)
        if(!validation){
            return NextResponse.json("bad token",{status:400})
        }
        const {projectId} = params
        const project:ProjectSchema&MongoDocument|null = await Project.findById(projectId)
        if(!project){ return NextResponse.json("Project not found",{status:404}) }

        const isOwner = project.user_id==validation._id
        const isContributor = project.contributors.some( c => c.user_id == validation._id )

        if(!isOwner&&!isContributor){
            return NextResponse.json("Unauthozided",{status:401})
        }

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

        // check document existence
        if (!currentProject){
            return NextResponse.json("Project not found",{status:400})
        }

        // check if user is a contributor
        /// token = user token
        /// decrypt token -> token* -> user_id
        /// check if contributors contain user_id

        // check request reasoanableness
        if(updatedProject.user_id!=currentProject.user_id){
            return NextResponse.json("can't update user id",{status:401})
        }

        // check duplicated contributors
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