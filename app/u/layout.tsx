"use client"

import { useAuthStore } from "@/store/Auth/AuthStore";
import { Box, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";
import { ReactNode, useEffect } from "react";

const Layout = ({children}:{
    children:ReactNode
}) => {

    const authenticated = useAuthStore((state)=>(state.store.authenticated))
    const router = useRouter()

    useEffect(()=>{

        if(authenticated){ return }
        const cookieToken = parseCookies().token
        if(!cookieToken){
            router.push("/login")
            return
        }
        // refresh token


    },[])

    return (
        <>
        {authenticated&&
        <Box border="3px solid" height="100%">
            {children}
        </Box>
        }
        </>
    );
}
 
export default Layout;