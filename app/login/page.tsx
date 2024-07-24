import { Button, Stack, TextField, Typography } from "@mui/material";
import Link from "next/link";

const Page = () => {
    return (
        <>
        
        <Stack {...{
          height:"100%",
          justifyContent:"space-around",
          alignItems:"center"
        }}>
            <Typography variant="h1" color="primary">
                Kabin
            </Typography>
            <Stack width="100%" maxWidth={300} spacing={1}>
                <Typography variant="h4" color="primary" textAlign="end" pb={2}>
                    Login
                </Typography>
                <TextField {...{
                    size:"small",
                    label:"Email",
                    variant:"standard"
                }}/>
                <TextField {...{
                    size:"small",
                    label:"Password",
                    variant:"standard"
                }}/>
                <Button variant="outlined" href="/u/dashboard">
                    sign in
                </Button>
                <Typography variant="body2" pt={2}>
                    Don't have an account? <Link href={"/register"} style={{textDecoration:"underline"}}>Sign up</Link>
                </Typography>
            </Stack>
        </Stack>
        </>
    );
}
 
export default Page;