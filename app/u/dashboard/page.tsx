"use client"

import { useProjectStore } from "@/store/Projects/ProjectStore";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import { useAuthStore } from "@/store/Auth/AuthStore";
import { useEffect } from "react";
import CreateProject from "@/components/projects/CreateProject";
import ProjectCard from "@/components/projects/ProjectCard";
import Taeko from "@/components/layout/grids&layouts/Taeko";
import { Checklist } from "@mui/icons-material";

const Page = () => {

    const authenticated = useAuthStore((state)=>(state.store.authenticated))
    const user_id = useAuthStore((state)=>(state.store.user?._id))
    const projects = useProjectStore((state)=>(state.store.projects))
    const refresh = useProjectStore((state)=>(state.method.refresh))

    useEffect(()=>{
        if(!authenticated){ return }
        refresh()
    },[])

    return (

        <Taeko {...{
            title:<Typography variant="h4">Lists</Typography>,
            buttons:[<CreateProject/>]
        }}>
            <Box {...{
                border:"1px solid yellow",
                display:"grid",
                gridTemplateColumns:{
                    sm:"1fr",
                    md:"1fr 1fr",
                },
                gridTemplateRows:"auto 1fr",
                gap:2,
                height:"100%",
                sx:{
                    overflowY:{
                        sm:"scroll",
                        md:"hidden"
                    },
                    overflowX:"hidden"
                },
                
            }}>

                <Box {...{
                    border:"1px solid green",
                    display:{xs:"none",sm:"none",md:"grid"},
                    gap:2,
                    gridColumn:"span 2",
                    gridTemplateColumns:"auto auto",
                    height:"fit-content",
                    alignItems:"center",
                    alignContent:"center"
                }}>
                    <Typography {...{variant:"h5"}}>
                        owned
                    </Typography>
                    <Typography {...{variant:"h5"}}>
                        shared
                    </Typography>
                </Box>

                <Box {...{display:{xs:"block",sm:"block",md:"none"}}}>
                    <Typography {...{variant:"h5"}}>
                        owned
                    </Typography>
                </Box>

                <Box {...{
                    border:"1px solid red",
                    height:"100%",
                    width:"100%",
                    sx:{overflowY:{sm:"visible",md:"scroll"}},
                    pt:1,pb:1
                }}>
                    <Stack {...{
                        spacing:1
                    }}>
                        {projects&&
                        projects.filter(proj=>proj.user_id==user_id)
                        .map((project,i)=>(
                            <ProjectCard key={`prj_crd${i}`} {...{project}}/>
                        )).reverse()}
                    </Stack>
                </Box>

                <Box {...{display:{sm:"block",md:"none"}}}>
                    <Typography {...{variant:"h5"}}>
                        shared
                    </Typography>
                </Box>

                <Box {...{
                    border:"1px solid red",
                    overflow:{sm:"visible",md:"hidden"},
                    height:"100%",
                    sx:{overflowY:{sm:"visible",md:"scroll"}},
                    pt:1,pb:1
                }}>
                    <Stack {...{
                        spacing:1
                    }}>
                        {projects&&
                        projects.filter(proj=>proj.user_id!=user_id)
                        .map((project,i)=>(
                            <ProjectCard key={`prj_crd${i}`} {...{project}}/>
                        )).reverse()}
                    </Stack>
                </Box>
            </Box>

        </Taeko>

    );
}
 
export default Page;