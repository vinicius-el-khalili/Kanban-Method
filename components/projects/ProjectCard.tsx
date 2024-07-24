"use client"

import { ProjectSchema } from "@/models/Project";
import { MongoDocument } from "@/types/MongoDocument";
import { Avatar, Card, CardHeader } from "@mui/material";

const ProjectCard = ({project}:{
    project:ProjectSchema&MongoDocument
}) => {
    return (
        <>
        <Card variant="outlined">
            <CardHeader
                avatar={<Avatar>U</Avatar>}
                title={project.title}
                subheader={project.user_id}
            />
        </Card>
        </>
    );
}
 
export default ProjectCard;