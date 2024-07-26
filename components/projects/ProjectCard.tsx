"use client"

import { ProjectSchema } from "@/models/Project";
import { useProjectStore } from "@/store/Projects/ProjectStore";
import { MongoDocument } from "@/types/MongoDocument";
import { Checklist } from "@mui/icons-material";
import { Avatar, AvatarGroup, Box, ButtonBase, Card, CardContent, CardHeader, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

const ProjectCard = ({project}:{
    project:ProjectSchema&MongoDocument
}) => {

    const router = useRouter()
    const initializeProjectPageByID = useProjectStore((state)=>(state.method.initializeProjectPageByID))

    const onClick = async()=>{

        await initializeProjectPageByID(project._id)
        router.push(`/u/project/${project._id}`)
        
    }

    return (
        <>
        <ButtonBase 
        sx={{width:"100%"}} 
        component={"div"} 
        onClick={onClick}>

            <Box sx={{ width: "100%" }}>
                <Card variant="outlined" sx={{width:"100%"}}>

                    <Box {...{
                        pt:0.7,pb:1,pl:2,pr:2
                    }}>
                        <Stack {...{
                            direction:"row",
                            justifyContent:"space-between",
                            alignItems:"center"
                        }}>

                            <Typography variant="h5" sx={{display:"flex",alignItems:"center",gap:1.5}}>
                                <Checklist/> {project.title}
                            </Typography>
                            <AvatarGroup>
                                {project.contributors.map((contributor,i)=>(
                                    <Avatar>
                                        {contributor.username[0]}
                                    </Avatar>
                                ))}
                            </AvatarGroup>

                        </Stack>
                    </Box>

                </Card>
            </Box>

        </ButtonBase>
        </>
    );
}
 
export default ProjectCard;