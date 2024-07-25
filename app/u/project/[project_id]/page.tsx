"use client"

import CreateTask from "@/components/tasks/CreateTask";
import Tasks from "@/components/tasks/Tasks";
import { useProjectStore } from "@/store/Projects/ProjectStore";
import { Typography } from "@mui/material";

const Page = ({ params }: { params: { project_id: string } }) => {

    const { project_id } = params
    const selectedProject = useProjectStore((state)=>(state.store.selectedProject))

    return (
        <>
        
        {selectedProject&&
        <Typography variant="h5">
            {selectedProject.title}
        </Typography>}

        {!selectedProject&&
        <Typography variant="h5">
            null
        </Typography>}

        <CreateTask/>
        
        <Tasks/>
        </>
    );
}
 
export default Page;