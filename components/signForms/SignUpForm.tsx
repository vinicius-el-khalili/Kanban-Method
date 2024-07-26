"use client"

import { useAuthStore } from "@/store/Auth/AuthStore";
import { TextField, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SignUpForm = () => {

    const [login,set_login] = useState<string|null>(null)
    const [password,set_password] = useState<string|null>(null)
    const [username,set_username] = useState<string|null>(null)
    const signUp = useAuthStore((state)=>(state.method.signup))
    const router = useRouter()

    const handleSubmit = async () => {

        if(!login||!password||!username){ return }
        const status = await signUp({login,password,username})
        if(status==200){router.push("/u/dashboard")}
        
    }

    return (
        <>
        <TextField {...{
            size:"small",
            label:"Login",
            variant:"standard",
            value:login?login:"",
            onChange:(e)=>{set_login(e.target.value)}
        }}/>
        <TextField {...{
            size:"small",
            label:"Password",
            variant:"standard",
            value:password?password:"",
            onChange:(e)=>{set_password(e.target.value)}
        }}/>
        <TextField {...{
            size:"small",
            label:"Username",
            variant:"standard",
            value:username?username:"",
            onChange:(e)=>{set_username(e.target.value)}
        }}/>
        <Button variant="outlined" onClick={handleSubmit}>
            sign up
        </Button>
        </>
    );
}
 
export default SignUpForm;
