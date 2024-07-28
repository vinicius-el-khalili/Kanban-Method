"use client"

import Taeko from "@/components/layout/grids&layouts/Taeko";
import TaekoTitle from "@/components/layout/grids&layouts/TaekoTitle";
import AddContributorToProject from "@/components/projects/AddContributorToProject";
import CreateTask from "@/components/tasks/CreateTask";
import KanbanGrid from "@/components/tasks/KanbanGrid";
import { useAuthStore } from "@/store/Auth/AuthStore";
import { useProjectStore } from "@/store/Projects/ProjectStore";
import { Checklist } from "@mui/icons-material";
import { Avatar, AvatarGroup, Stack, Typography } from "@mui/material";
import { useEffect } from "react";

const Page = ({ params }: { params: { project_id: string } }) => {

    const { project_id } = params
    const selectedProject = useProjectStore((state)=>(state.store.selectedProject))
    const initializeProjectPageByID = useProjectStore((state)=>(state.method.initializeProjectPageByID))
    const authenticated = useAuthStore((state)=>(state.store.authenticated))

    useEffect(()=>{
        ;(async()=>{
            if(selectedProject||!authenticated){ return }
            await initializeProjectPageByID(project_id)
        })();
    },[])

    return (
        <>
        {authenticated&&selectedProject&&
        <Taeko 
        title={
            <>
            <TaekoTitle {...{
                title:selectedProject.title,
                subtitle:"/lists/",
                icon:<Checklist/>,
            }}/>
            <AvatarGroup {...{
                sx:{justifyContent:"start"}
            }}>
                {selectedProject.contributors.map((contributor,i)=>(
                    <Avatar>
                        {contributor.username[0]}
                    </Avatar>
                ))}
            </AvatarGroup>
            </>
        }
        buttons={[<CreateTask/>,<AddContributorToProject/>]}
        >
            <KanbanGrid/>
        </Taeko>
        }
        </>
    );
}
 
export default Page;