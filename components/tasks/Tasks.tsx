"use client"

import { useTaskStore } from "@/store/Tasks/TaskStore";
import TaskCard from "./TaskCard";
import { Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import { useProjectStore } from "@/store/Projects/ProjectStore";

const Tasks = () => {

    const tasks = useTaskStore((state)=>(state.store.tasks))
    const selectedProject = useProjectStore((state)=>(state.store.selectedProject))
    
    return (
        <>
        <Stack key={selectedProject?._id}>
        {tasks&&tasks.length>0&&
            tasks.map((task,i)=>(
                <TaskCard key={`tskcrd${i}`} {...{task}}/>
            ))
        }
        </Stack>
        </>
    );
}
 
export default Tasks;