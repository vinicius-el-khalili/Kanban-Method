"use client"

import { useProjectStore } from "@/store/Projects/ProjectStore";
import ProjectCard from "./ProjectCard";
import { Button, Stack, Typography } from "@mui/material";
import { useAuthStore } from "@/store/Auth/AuthStore";
import { useEffect } from "react";
import CreateProject from "./CreateProject";

const Projects = () => {

    const authenticated = useAuthStore((state)=>(state.store.authenticated))
    const projects = useProjectStore((state)=>(state.store.projects))
    const refresh = useProjectStore((state)=>(state.method.refresh))
    const create = useProjectStore((state)=>(state.method.create))

    useEffect(()=>{
        if(!authenticated){ return }
        refresh()
    },[])

    return (
        <>
        <Stack spacing={3} pt={4}>
            <Typography variant="h4">Projects</Typography>
            <CreateProject/>
            <Stack spacing={1}>
                {projects&&projects.map((project,i)=>(
                    <ProjectCard key={`prj_crd${i}`} {...{project}}/>
                )).reverse()}
            </Stack>
        </Stack>
        </>
    );
}
 
export default Projects;