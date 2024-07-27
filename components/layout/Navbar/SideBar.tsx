"use client"

import { useAuthStore } from "@/store/Auth/AuthStore";
import { useThemeStore } from "@/store/Theme/ThemeStore";
import { Checklist, DarkMode, Home, LightMode, Logout, MenuOpen, Person, TaskAlt } from "@mui/icons-material";
import { Avatar, Box, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, Toolbar, Typography } from "@mui/material";
import { blue, teal } from "@mui/material/colors";
import { useRouter } from "next/navigation";

const SideBar = () => {

    const user = useAuthStore((state)=>(state.store.user))
    const authenticated = useAuthStore((state)=>(state.store.authenticated))
    const signout = useAuthStore((state)=>(state.method.signout))
    const mode = useThemeStore((state)=>(state.mode))
    const toggleMode = useThemeStore((state)=>(state.toggleMode))
    const router = useRouter()

    return (
        <>
        <Drawer
          variant="permanent"
          ModalProps={{keepMounted:false}}
          open={true}
          sx={{display:{xs:"none",sm:"block"}}}
        >
            <Toolbar sx={{height:"100%"}}>
                <Stack justifyContent={"space-between"} height={"100%"}>

                    <List>

                        <ListItem>
                            <ListItemButton onClick={()=>{console.log(user)}}>
                                <Avatar sx={{height:28,width:28}}>
                                    {user?.username[0]}
                                </Avatar>
                                <span style={{width:12}}/>
                                <Typography>{user?.username}</Typography>
                            </ListItemButton>
                        </ListItem>
                        <Divider/>
                        <ListItem>
                            <Box {...{
                                width:"100%",
                                display:"flex",
                                justifyContent:"center"
                            }}>
                                <IconButton {...{
                                    onClick:toggleMode
                                }}>
                                    {mode=="dark"?
                                    <DarkMode fontSize="small"/>
                                    :<LightMode fontSize="small"/>}
                                </IconButton>
                            </Box>
                        </ListItem>
                    </List>

                    <List>
                        <ListItem>
                            <ListItemButton onClick={()=>router.push("/u/dashboard")}>
                                <Checklist/>
                                <span style={{width:12}}/>
                                <ListItemText primary={"lists"}/>
                            </ListItemButton>
                        </ListItem>
                    </List>

                    <List>
                        <Divider/>        
                        <ListItem>
                            <ListItemButton 
                            onClick={()=>{signout(router)}}>
                                <Logout fontSize="small"/>
                                <span style={{width:12}}/>
                                <Typography>
                                    Logout
                                </Typography>
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