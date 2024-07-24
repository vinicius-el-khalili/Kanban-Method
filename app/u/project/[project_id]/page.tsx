import { Typography } from "@mui/material";

const Page = ({ params }: { params: { project_id: string } }) => {

    const { project_id } = params

    return (
        <>
        <Typography variant="h1">
            {project_id}
        </Typography>
        </>
    );
}
 
export default Page;