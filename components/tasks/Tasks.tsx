"use client"

import { useTaskStore } from "@/store/Tasks/TaskStore";
import TaskCard from "./TaskCard";
import { Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import { useProjectStore } from "@/store/Projects/ProjectStore";

const Tasks = () => {

    const tasks = useTaskStore((state)=>(state.store.tasks))
    const refreshTasks = useTaskStore((state)=>(state.method.refresh))
    const selectedProject = useProjectStore((state)=>(state.store.selectedProject))

    //useEffect(()=>{
    //    (async()=>{
//
    //        if(!selectedProject){ return }
    //        await refreshTasks(selectedProject._id)
//
    //    })();
    //},[])

    return (
        <>
        <Stack key={selectedProject?._id}>
        {tasks&&tasks.length>0?
            tasks.map((task,i)=>(
                <TaskCard key={`tskcrd${i}`} {...{task}}/>
            ))
        :
        <Typography variant="h6">Empty tasks</Typography>
        }
        </Stack>
        </>
    );
}
 
export default Tasks;