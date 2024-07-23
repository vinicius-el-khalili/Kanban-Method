import Project from "@/models/Project";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest,{params}:{params:{userId:string}}){
    try{

        const {userId} = params
        const projects = await Project.find({user_id:userId})
        return NextResponse.json(projects)

    }catch(err:any){
        return NextResponse.json({error:err.message},{status:500})
    }
}
