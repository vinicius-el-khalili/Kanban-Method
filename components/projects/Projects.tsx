"use client"

import { useProjectStore } from "@/store/Projects/ProjectStore";
import ProjectCard from "./ProjectCard";
import { Button, Typography } from "@mui/material";
import { useAuthStore } from "@/store/Auth/AuthStore";
import { useEffect } from "react";

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
        <Button variant="contained" onClick={refresh}>refresh projects</Button>
        <Button variant="contained" onClick={()=>create("Peach's Project 2")}>create project</Button>
        <Typography variant="h5">Projects</Typography>
        {projects&&projects.map((project,i)=>(
            <ProjectCard key={`prj_crd${i}`} {...{project}}/>
        ))}
        <Typography variant="h5">Shared Projects</Typography>
        {projects&&projects.map((project,i)=>(
            <ProjectCard key={`prj_crd${i}`} {...{project}}/>
        ))}
        </>
    );
}
 
export default Projects;