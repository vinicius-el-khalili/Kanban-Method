"use client"

import { useAuthStore } from "@/store/Auth/AuthStore";
import { Checklist, Home, Logout, MenuOpen, Person, TaskAlt } from "@mui/icons-material";
import { Avatar, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, Toolbar, Typography } from "@mui/material";
import { blue, teal } from "@mui/material/colors";
import { useRouter } from "next/navigation";

const SideBar = () => {

    const user = useAuthStore((state)=>(state.store.user))
    const authenticated = useAuthStore((state)=>(state.store.authenticated))
    const signout = useAuthStore((state)=>(state.method.signout))
    const router = useRouter()

    return (
        <>
        <Drawer
          variant="permanent"
          ModalProps={{
            keepMounted: false,
          }}
          open
        >
            <Toolbar sx={{height:"100%"}}>
                <Stack justifyContent={"space-between"} height={"100%"}>

                    <List>
                        <ListItem>
                            <ListItemButton onClick={()=>{console.log(user)}}>
                                <ListItemIcon>
                                    <Avatar sx={{bgcolor:teal[300],height:36,width:36}}>
                                        {user?.username[0]}
                                    </Avatar>
                                </ListItemIcon>
                                <ListItemText primary={user?.username}/>
                            </ListItemButton>
                        </ListItem>
                        <Divider/>
                    </List>

                    <List>
                        <ListItem disablePadding>
                            <ListItemButton onClick={()=>router.push("/u/dashboard")}>
                                <Checklist/>
                                <span style={{width:12}}/>
                                <ListItemText primary={"Projects"}/>
                            </ListItemButton>
                        </ListItem>
                    </List>

                    <List>
                        <Divider/>
                        <ListItem disablePadding>
                            <ListItemButton onClick={()=>{signout(router)}}>
                                <ListItemIcon>
                                    <Logout/>
                                </ListItemIcon>
                                <ListItemText primary={"Logout"}/>
                            </ListItemButton>
                        </ListItem>
                    </List>

                </Stack>
            </Toolbar>
        </Drawer>
        </>
    );
}
 
export default SideBar;