"use client"

import { useProjectStore } from "@/store/Projects/ProjectStore";
import ProjectCard from "./ProjectCard";
import { Button } from "@mui/material";

const Projects = () => {

    const projects = useProjectStore((state)=>(state.store.projects))
    const refresh = useProjectStore((state)=>(state.method.refresh))
    const create = useProjectStore((state)=>(state.method.create))

    return (
        <>
        <Button variant="contained" onClick={refresh}>refresh projects</Button>
        <Button variant="contained" onClick={()=>create("Peach's Project 2")}>create project</Button>
        {
        projects&&
        projects.map((project,i)=>(
            <ProjectCard key={`prj_crd${i}`} {...{project}}/>
        ))
        }
        </>
    );
}
 
export default Projects;