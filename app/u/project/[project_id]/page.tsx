import { Typography } from "@mui/material";

const Page = ({ params }: { params: { project_id: string } }) => {

    const { project_id } = params

    return (
        <>
        <Typography variant="h4">
            Project {project_id}
        </Typography>
        
        </>
    );
}
 
export default Page;