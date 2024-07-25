import dbConnect from "@/lib/dbConnect";
import Project, { ProjectSchema } from "@/models/Project";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    await dbConnect()
    try{

        const projects = await Project.find({})
        return NextResponse.json(projects)

    }catch(err:any){
        return NextResponse.json({error:err.message},{status:500})
    }
}

export async function POST(req:NextRequest) {
    await dbConnect()
    try{

        const newProject:ProjectSchema = await req.json()
        console.log(newProject)
        const project = await Project.create(newProject)
        console.log("first")
        return NextResponse.json(project)

    }catch(err:any){
        return NextResponse.json({error:err.message},{status:500})
    }

}