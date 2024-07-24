import SignUpForm from "@/components/signForms/SignUpForm";
import { Stack, Typography } from "@mui/material";
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
                <Typography variant="h4" textAlign="end" pb={2}>
                    Login
                </Typography>
                <SignUpForm/>
                <Typography variant="body2" pt={2}>
                    Don't have an account? <Link href={"/register"} style={{textDecoration:"underline"}}>Sign up</Link>
                </Typography>
            </Stack>
        </Stack>
        </>
    );
}
 
export default Page;