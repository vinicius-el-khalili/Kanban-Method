import { House, Menu } from "@mui/icons-material";
import { AppBar, Box, Drawer, IconButton, Toolbar, Typography } from "@mui/material";
import { ReactNode } from "react";

const Layout = ({children}:{
    children:ReactNode
}) => {
    return (
        <Box border="5px solid" height="100%">
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton>
                        <Menu/>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer variant="persistent" open>
                <IconButton><House/></IconButton>
                <IconButton><House/></IconButton>
                <IconButton><House/></IconButton>
            </Drawer>
            {children}
        </Box>
    );
}
 
export default Layout;