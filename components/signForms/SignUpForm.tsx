"use client"

import { useAuthStore } from "@/store/Auth/AuthStore";
import { TextField, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SignUpForm = () => {

    const [email,set_email] = useState<string|null>(null)
    const [password,set_password] = useState<string|null>(null)
    const [username,set_username] = useState<string|null>(null)
    const signUp = useAuthStore((state)=>(state.method.signup))
    const router = useRouter()

    const handleSubmit = async () => {

        if(!email||!password||!username){ return }
        const status = await signUp({email,password,username})
        if(status==200){router.push("/u/dashboard")}
        
    }

    return (
        <>
        <TextField {...{
            size:"small",
            label:"Email",
            variant:"standard",
            value:email?email:"",
            onChange:(e)=>{set_email(e.target.value)}
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
