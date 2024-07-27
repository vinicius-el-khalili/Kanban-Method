import dbConnect from "@/lib/dbConnect";
import { validateTokenizedRequest } from "@/lib/validateToken";
import Project from "@/models/Project";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest,{params}:{params:{userId:string}}){

    await dbConnect()
    try{ 

        // find projects by user id

        const payload = validateTokenizedRequest(req)
        if(!payload){ return NextResponse.json("bad token",{status:400}) }
        const {userId} = params

        // check user authenticity
        if(userId != payload._id){ return NextResponse.json("unauthorized",{status:401}) }

        // find projects
        const projects = await Project.find({
            $or:[
                {user_id:userId},
                {"contributors.user_id":userId}
            ]
        })

        return NextResponse.json(projects)

    } catch(err:any) {

        return NextResponse.json({error:err.message},{status:500})

    }
    
}