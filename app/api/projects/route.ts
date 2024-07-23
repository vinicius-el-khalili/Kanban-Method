import dbConnect from "@/lib/dbConnect";
import Project from "@/models/Project";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    await dbConnect()
    try {

        const projects = await Project.find({})
        return NextResponse.json(projects)

    }catch(err:any){
        return NextResponse.json({error:err.message},{status:500})
    }
}

export async function POST(req:NextRequest){
    await dbConnect()
    try {

        const {title,admin_id,contributors}:{
            title: string,
            admin_id: string,
            contributors:string[]
        } = await req.json()

        const project = await Project.create({
            title,
            admin_id,
            contributors
        })

        return NextResponse.json(project,{status:200})

    }catch(err:any){
        return NextResponse.json({error:err.message},{status:500})
    }
}