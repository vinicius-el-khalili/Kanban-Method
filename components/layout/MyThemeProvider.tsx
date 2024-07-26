"use client"

import { ThemeProvider, createTheme } from "@mui/material";
import { ReactNode } from "react";
import { useThemeStore } from "@/store/Theme/ThemeStore";
import { blue, deepOrange, deepPurple, green, red, teal } from "@mui/material/colors";


const MyThemeProvider = ({children}:{
    children: ReactNode
}) => {

    const mode = useThemeStore((state)=>(state.mode))
    const lightTheme = createTheme({
        palette:{
            mode:"light",
            primary:deepPurple,
            background: {
                default: "#eee",
                paper: "#e5e5e5"
            }
        },
        typography: {fontFamily:"monospace"}
    })

    const darkTheme = createTheme({
        palette:{
            mode:"dark",
            primary:teal
        },
        typography: {fontFamily:"monospace"}
    })

    return (
    <>
    <ThemeProvider theme={mode=="dark"?darkTheme:lightTheme}>
        {children}
    </ThemeProvider>
    </>
    );
}
 
export default MyThemeProvider;