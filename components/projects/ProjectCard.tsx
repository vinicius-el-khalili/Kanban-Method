"use client"

import { ProjectSchema } from "@/models/Project";
import { MongoDocument } from "@/types/MongoDocument";
import { MoreVert } from "@mui/icons-material";
import { Avatar, Box, ButtonBase, Card, CardHeader, IconButton, Typography } from "@mui/material";

const ProjectCard = ({project}:{
    project:ProjectSchema&MongoDocument
}) => {
    return (
        <>
        <ButtonBase sx={{ width: "100%" }} component={"a"} href={`/u/project/${project._id}`}>
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