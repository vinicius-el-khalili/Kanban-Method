import dbConnect from "@/lib/dbConnect"
import Task from "@/models/Task"
import { NextResponse } from "next/server"

export async function GET({params}:{params:{projectId:string}}){

    await dbConnect()
    try{

        const {projectId} = params
        const tasks = await Task.find({project_id:projectId})
        return NextResponse.json(tasks)
 
    }catch(err:any){
        return NextResponse.json({error:err.message},{status:500})
    }

}