"use client"

import CreateTask from "@/components/tasks/CreateTask";
import Tasks from "@/components/tasks/Tasks";
import { useProjectStore } from "@/store/Projects/ProjectStore";
import { Stack, Typography } from "@mui/material";
import { useEffect } from "react";

const Page = ({ params }: { params: { project_id: string } }) => {

    const { project_id } = params
    const selectedProject = useProjectStore((state)=>(state.store.selectedProject))
    const selectProject = useProjectStore((state)=>(state.method.select))
    const initializeProjectPageByID = useProjectStore((state)=>(state.method.initializeProjectPageByID))

    useEffect(()=>{

        if(selectedProject){ return }
        ;(async()=>{
            await initializeProjectPageByID(project_id)
        })();


    },[])

    return (
        <>
        <Stack spacing={3} pt={4}>
            <Typography variant="h4">
                <span style={{opacity:.4}}>{`Projects > `}</span>
                {`${selectedProject?selectedProject.title:""}`}</Typography>
            <CreateTask/>
            <Tasks/>
        </Stack>
        </>
    );
}
 
export default Page;