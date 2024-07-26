"use client"

import { useAuthStore } from "@/store/Auth/AuthStore";
import { TextField, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SignInForm = () => {

    const [email,set_email] = useState<string|null>(null)
    const [password,set_password] = useState<string|null>(null)
    const signIn = useAuthStore((state)=>(state.method.signin))
    const router = useRouter()

    const handleSubmit = async ()=>{

        if(!email||!password){ return }
        const status = await signIn(email,password)
        if(status==200){router.push("/u/dashboard")}
        
    }

    return (
        <>
        <TextField {...{
            size:"small",
            label:"Login",
            variant:"standard",
            value:email?email:"",
            required:true,
            onChange:(e)=>{set_email(e.target.value)}
        }}/>
        <TextField {...{
            size:"small",
            label:"Password",
            variant:"standard",
            value:password?password:"",
            required:true,
            onChange:(e)=>{set_password(e.target.value)}
        }}/>
        <Button variant="outlined" onClick={handleSubmit} disabled={!email||!password}>
            sign in
        </Button>
        </>
    );
}
 
export default SignInForm;
