"use client"

import { useProjectStore } from "@/store/Projects/ProjectStore";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import { useAuthStore } from "@/store/Auth/AuthStore";
import { useEffect } from "react";
import CreateProject from "@/components/projects/CreateProject";
import ProjectCard from "@/components/projects/ProjectCard";
import Taeko from "@/components/layout/grids&layouts/Taeko";
import { Check, Checklist } from "@mui/icons-material";
import MyTabs from "@/components/layout/lists-page/MyTabs";
import ProjectList from "@/components/projects/ProjectList";
import TaekoTitle from "@/components/layout/grids&layouts/TaekoTitle";

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
            title:<TaekoTitle {...{
                title:"lists",
                subtitle:"/",
                icon:<Checklist/>
            }}/>,
            buttons:[<CreateProject/>]
        }}>
            <MyTabs {...{
                panels:[{
                    label:"Owned",
                    children:<ProjectList projects={projects?projects.filter(proj=>proj.user_id==user_id):[]}/>
                },{
                    label:"Shared",
                    children:<ProjectList projects={projects?projects.filter(proj=>proj.user_id!=user_id):[]}/>
                }],
            }}/>                
        </Taeko>

    );
}
 
export default Page;