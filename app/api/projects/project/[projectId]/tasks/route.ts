import dbConnect from "@/lib/dbConnect"
import { validateTokenizedRequest } from "@/lib/validateToken"
import Project, { ProjectSchema } from "@/models/Project"
import Task, { TaskSchema } from "@/models/Task"
import { MongoDocument } from "@/types/MongoDocument"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req:NextRequest,{params}:{params:{projectId:string}}){

    await dbConnect()
    try{

        const payload = validateTokenizedRequest(req)
        if(!payload){ return NextResponse.json("bad token",{status:400}) }
        const {projectId} = params
        
        // find project
        const project:ProjectSchema&MongoDocument|null = await Project.findById(projectId)
        if(!project){ return NextResponse.json("Project not found",{status:404}) }

        // check if user is owner/contributor
        const user_id = payload._id
        const isOwner = project.user_id == user_id
        const isContributor = project.contributors.some( c => c.user_id == user_id )

        // find tasks
        const tasks:(TaskSchema&MongoDocument)[] = await Task.find({project_id:projectId})

        return NextResponse.json(tasks)
 
    }catch(err:any){

        return NextResponse.json({error:err.message},{status:500})

    }

}

export async function POST(req:NextRequest,{params}:{params:{projectId:string}}){

    await dbConnect()
    try{

        const payload = validateTokenizedRequest(req)
        if(!payload){ return NextResponse.json("bad token",{status:400}) }
        const {projectId} = params

        const newTask:TaskSchema = await req.json()
        const task:TaskSchema&MongoDocument = await Task.create(newTask)
        return NextResponse.json(task)

    }catch(err:any){

        return NextResponse.json({error:err.message},{status:500})

    }
}