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
                display:{xs:"none",sm:"none",md:"grid"},
                gridTemplateColumns:"1fr 1fr",
                gap:2,
            }}>
                <Typography {...{
                    variant:"h5" ,
                }}>
                    owned
                </Typography>
                <Typography {...{
                    variant:"h5" ,
                }}>
                    shared
                </Typography>
            </Box>


            <Box {...{
                display:"grid",
                gridTemplateColumns:{
                    sm:"1fr",
                    md:"1fr 1fr",
                },
                gridTemplateRows:{
                    sm:"1fr",
                    md:"1fr",
                },
                gap:2,
                height:{
                    sm:"fit-content",
                    md:"100%",
                },
                overflow:"hidden",
                pb:7
            }}>

                <Box {...{display:{sm:"block",md:"none"}}}>
                    <Typography {...{variant:"h5"}}>
                        owned
                    </Typography>
                </Box>

                <Box {...{
                    overflow:"hidden",
                    height:"100%",
                    sx:{overflowY:"scroll"},
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
                    overflow:"hidden",
                    height:"100%",
                    sx:{overflowY:"scroll"},
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