"use client"

import { useProjectStore } from "@/store/Projects/ProjectStore";
import { Button, Stack, Typography } from "@mui/material";
import { useAuthStore } from "@/store/Auth/AuthStore";
import { useEffect } from "react";
import CreateProject from "@/components/projects/CreateProject";
import ProjectCard from "@/components/projects/ProjectCard";
import Taeko from "@/components/layout/grids&layouts/Taeko";

const Page = () => {

    const authenticated = useAuthStore((state)=>(state.store.authenticated))
    const projects = useProjectStore((state)=>(state.store.projects))
    const refresh = useProjectStore((state)=>(state.method.refresh))

    useEffect(()=>{
        if(!authenticated){ return }
        refresh()
    },[])

    return (
        <>
        <Taeko 
        title="Projects"
        buttons={[<CreateProject/>]}
        >
            <Stack spacing={1}>
                {projects&&projects.map((project,i)=>(
                    <ProjectCard key={`prj_crd${i}`} {...{project}}/>
                )).reverse()}
            </Stack>
        </Taeko>
        </>
    );
}
 
export default Page;