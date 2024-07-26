import Project from "@/models/Project";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest,{params}:{params:{userId:string}}){
    try{ // GET Projects by User id

        const {userId} = params
        const projects = await Project.find({
            $or:[
                {user_id:userId},
                {"contributors.user_id":userId}
            ]
        })
        return NextResponse.json(projects)

    }catch(err:any){
        return NextResponse.json({error:err.message},{status:500})
    }
}