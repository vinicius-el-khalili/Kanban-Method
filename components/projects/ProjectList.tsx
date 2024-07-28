import { ProjectSchema } from "@/models/Project";
import { MongoDocument } from "@/types/MongoDocument";
import { Box, Stack } from "@mui/material";
import ProjectCard from "./ProjectCard";

const ProjectList = ({projects}:{
    projects:(ProjectSchema&MongoDocument)[]
}) => {

    return (
        <>
        <Box {...{
            overflow:{sm:"visible",md:"hidden"},
            height:"100%",
            sx:{overflowY:{sm:"visible",md:"scroll"}},
            pt:1,pb:1
        }}>
            <Stack {...{
                spacing:1
            }}>
                {projects.map((project,i)=>(
                    <ProjectCard key={`prj_crd${project._id}`} {...{project}}/>
                )).reverse()}
            </Stack>
        </Box>
        </>
    );
}
 
export default ProjectList;