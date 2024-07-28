import { Swipe } from "@mui/icons-material";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import { ReactNode, useState } from "react";

const MyTabs = ({panels}:{
    panels:{
        label:string,
        children:ReactNode
    }[],
}) => {

    const [tab,set_tab] = useState<number>(0)

    return (
        <>
        <Box {...{
            sx:{
                bgcolor:"background.paper",
                overflow:"hidden"
            },
            display:"grid",
            gridTemplateRows:"auto 1fr",
            gridTemplateColumns:{
                xs:"1fr",
                sm:"1fr",
                md:"1fr 1fr"
            }
        }}>
            <Tabs {...{
                value:tab,
                onChange:(e,v)=>{set_tab(v)},
            }}>
                {panels.map((panel,i)=>(
                   <Tab {...{label:panel.label,value:i}} key={`tab${i}`}/> 
                ))}
            </Tabs>
                <Box {...{
                    sx:{overflowY:"scroll",gridRow:"2"}
                }}>
                    {panels.map((panel,i)=>tab==i&&panel.children)}
                </Box>
        </Box>
        </>
    );
}

export default MyTabs;