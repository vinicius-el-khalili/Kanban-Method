"use client"

import { useProjectStore } from "@/store/Projects/ProjectStore";
import { AvatarGroup, Box, Stack, Typography } from "@mui/material";
import { ReactNode } from "react";

const Taeko = ({children,title,buttons}:{
    children:ReactNode
    title:JSX.Element,
    buttons:JSX.Element[]
}) => {

    const selectedProject = useProjectStore((state)=>(state.store.selectedProject))

    return (
        <>
        <Box {...{
            display:"grid",
            gridTemplateRows:"auto auto 1fr",
            height:"100%",
            sx:{
                overflowY:"hidden"
            },
            pt:4,pb:2
        }}>

            <Typography {...{
                variant:"h4",
                sx:{pb:2}
            }}>
                {title}
            </Typography>

            <Stack {...{
                direction:"row",
                spacing:2,
                pb:2,pt:2
            }}>
                {buttons}
            </Stack>

            <>
            {children}
            </>

        </Box>
        </>
    );
}
 
export default Taeko;