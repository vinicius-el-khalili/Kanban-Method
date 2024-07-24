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
                    New Account
                </Typography>
                <SignUpForm/>
                <Typography variant="body2" pt={2}>
                    Already have an account? <Link href={"/login"} style={{textDecoration:"underline"}}>Sign in</Link>
                </Typography>
            </Stack>
        </Stack>
        </>
    );
}
 
export default Page;