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
            //border:"1px dashed yellow",
            height:"100%",
            sx:{
                overflowY:"hidden"
            },
            pt:2
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
                pb:2,
            }}>
                {buttons}
                {buttons}
            </Stack>
            
            <Box {...{
                border:"3px solid green",
                overflow:"hidden"
            }}>
                {children}
            </Box>
        </Box>
        </>
    );
}
 
export default Taeko;