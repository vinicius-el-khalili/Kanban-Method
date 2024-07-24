"use client"

import { TextField, Button } from "@mui/material";
import { useState } from "react";

const SignUpForm = () => {

    const [email,set_email] = useState<string|null>(null)
    const [password,set_password] = useState<string|null>(null)
    const handleSubmit = async () => {

        const res = await fetch("/api/users/signin",{
            method:"POST",
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json",
            },
            body: JSON.stringify({email,password})
        })
        console.log(res)
        if(!res){return}
        const data = await res.json()
        console.log(data)
        
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
        <Button variant="outlined" onClick={handleSubmit}>
            sign in
        </Button>
        </>
    );
}
 
export default SignUpForm;
