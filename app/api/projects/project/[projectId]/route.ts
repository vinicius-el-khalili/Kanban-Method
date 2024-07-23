import Project from "@/models/Project";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest,{params}:{params:{projectId:string}}){
    try{

        const {projectId} = params
        const project = await Project.findById(projectId)
        return NextResponse.json(project)

    }catch(err:any){
        return NextResponse.json({error:err.message},{status:500})
    }
}

export async function PATCH(req:NextRequest,{params}:{params:{projectId:string}}){
    try{

        const {projectId} = params
        
        const {title,contributors}:{
            title?:string,
            contributors?:string[]
        } = await req.json()

        const project = await Project.updateOne({_id:projectId},{$set:{title,contributors}})
        
        return NextResponse.json(project)
 
    }catch(err:any){
        return NextResponse.json({error:err.message},{status:500})
    }
}