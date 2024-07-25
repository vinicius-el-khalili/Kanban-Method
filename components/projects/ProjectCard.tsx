"use client"

import { ProjectSchema } from "@/models/Project";
import { useProjectStore } from "@/store/Projects/ProjectStore";
import { MongoDocument } from "@/types/MongoDocument";
import { Avatar, Box, ButtonBase, Card, CardHeader } from "@mui/material";
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
                    <CardHeader
                        avatar={<Avatar>{project.contributors[0][1][0]}</Avatar>}
                        title={project.title}
                        />
                </Card>
            </Box>

        </ButtonBase>
        </>
    );
}
 
export default ProjectCard;