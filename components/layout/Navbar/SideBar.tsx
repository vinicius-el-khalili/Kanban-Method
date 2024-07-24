"use client"

import { useAuthStore } from "@/store/Auth/AuthStore";
import { Checklist, Home, MenuOpen, Person, TaskAlt } from "@mui/icons-material";
import { Avatar, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, Toolbar, Typography } from "@mui/material";
import { blue, teal } from "@mui/material/colors";

const SideBar = () => {

    const user = useAuthStore((state)=>(state.store.user))

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
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <Checklist/>
                                </ListItemIcon>
                                <ListItemText primary={"Projects"}/>
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <TaskAlt/>
                                </ListItemIcon>
                                <ListItemText primary={"Tasks"}/>
                            </ListItemButton>
                        </ListItem>
                    </List>

                    <List>
                        <Divider/>
                        <ListItem disablePadding>
                            <ListItemButton onClick={()=>{console.log(user)}}>
                                <ListItemIcon>
                                    <Avatar sx={{bgcolor:teal[300]}}>
                                        {user?.username[0]}
                                    </Avatar>
                                </ListItemIcon>
                                <ListItemText primary={user?.username}/>
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