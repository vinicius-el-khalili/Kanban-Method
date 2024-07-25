import { Box, Stack, Typography } from "@mui/material";
import { ReactNode } from "react";

const Taeko = ({children,title,buttons}:{
    children:ReactNode
    title:string,
    buttons:JSX.Element[]
}) => {
    return (
        <>
        <Box {...{
            display:"grid",
            gridTemplateRows:"auto auto 1fr",
            height:"100%",
            sx:{
                overflowY:"hidden"
            },
            pt:2,pb:2
        }}>

            <Typography {...{
                variant:"h4",
                sx:{
                    pb:2
                }
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
            
            <Box {...{
                overflow:"hidden",
                pt:2
            }}>
                {children}
            </Box>
        </Box>
        </>
    );
}
 
export default Taeko;