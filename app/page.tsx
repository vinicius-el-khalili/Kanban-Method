import { Box, Button, Link, Stack, Typography } from "@mui/material";

const Home = () => {
  return (
    <>
    <Stack {...{
      height:"100%",
      justifyContent:"space-around",
      alignItems:"center"
    }}> 

      <Stack>
        <Typography textAlign="center" variant="h1" color="primary">Kabin</Typography>
        <Typography textAlign="center" variant="h4">Get shit done</Typography>
      </Stack>

      <Stack spacing={2} alignItems="center" width={200}>
        <Button size="large" fullWidth variant="outlined" href="/login">Login</Button>
        <Button size="large" fullWidth variant="text" href="/register">Register</Button>
      </Stack>

    </Stack>
    </>
  );
}
 
export default Home;