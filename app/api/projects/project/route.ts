import dbConnect from "@/lib/dbConnect";
import { validateTokenizedRequest } from "@/lib/validateToken";
import Project, { ProjectSchema } from "@/models/Project";
import { NextRequest, NextResponse } from "next/server";

export async function POST (req:NextRequest){

    await dbConnect()
    try {

        const payload = validateTokenizedRequest(req)
        if(!payload){ return NextResponse.json("bad token",{status:400}) }
        
        const newProject:ProjectSchema = await req.json()
        const project = await Project.create(newProject)
        return NextResponse.json(project)

    }catch(err:any){

        return NextResponse.json({error:err.message},{status:500})

    }

}