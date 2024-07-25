"use client"

import { useProjectStore } from "@/store/Projects/ProjectStore";
import { Typography } from "@mui/material";

const Page = ({ params }: { params: { project_id: string } }) => {

    const { project_id } = params
    const selectedProject = useProjectStore((state)=>(state.store.selectedProject))

    return (
        <>
        <Typography variant="h4">
            Project {project_id}
        </Typography>
        {selectedProject&&
        <Typography variant="h5">
            {selectedProject.title}
        </Typography>
        }
        {!selectedProject&&
        <Typography variant="h5">
            null
        </Typography>
        }
        </>
    );
}
 
export default Page;