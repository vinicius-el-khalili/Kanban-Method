import dbConnect from "@/lib/dbConnect";
import Task from "@/models/Task";
import { NextResponse } from "next/server";


export async function GET() {
    await dbConnect()
    try{ 
        const tasks = await Task.find({})    
        return NextResponse.json(tasks)    
    }catch(err:any){
        return NextResponse.json({error:"error"})
    }
}