import dbConnect from "@/lib/dbConnect";
import Project from "@/models/Project";
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

        const {user_id,project_id,title,contributors}:{
            user_id:string,
            project_id:string,
            title:string,
            contributors:string[]
        } = await req.json()

        const project = await Project.create({
            user_id,
            project_id,
            title,
            contributors
        })

        return NextResponse.json(project)

    }catch(err:any){
        return NextResponse.json({error:err.message},{status:500})
    }
}