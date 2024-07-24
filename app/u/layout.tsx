"use client"

import SideBar from "@/components/layout/Navbar/SideBar";
import { useAuthStore } from "@/store/Auth/AuthStore";
import { Box, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";
import { ReactNode, useEffect } from "react";

const Layout = ({children}:{
    children:ReactNode
}) => {

    const authenticated = useAuthStore((state)=>(state.store.authenticated))
    const refresh = useAuthStore((state)=>(state.method.refresh))
    const signout = useAuthStore((state)=>(state.method.signout))
    const router = useRouter()

    useEffect(()=>{
        ;(async()=>{

            if(authenticated){ return }
            const cookieToken = parseCookies().token
            if(!cookieToken){ 
                router.push("/login")
                return
            }
            const _refresh = await refresh(cookieToken)
            if(!_refresh){ 
                router.push("/login")
                return
            }
            
        })();
    },[])

    return (
        <>
        {authenticated&&
        <Box height="100%">
            <SideBar/>
            <Box pl={30}>
                <Button variant="contained" onClick={()=>signout(router)}>
                    Logout
                </Button>
            </Box>
            {children}
        </Box>
        }
        </>
    );
}
 
export default Layout;