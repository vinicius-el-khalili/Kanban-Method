import type { Metadata } from "next";
import "./globals.scss";
import { Container, CssBaseline } from "@mui/material";
import MyThemeProvider from "@/components/layout/MyThemeProvider";
import SideBar from "@/components/layout/Navbar/SideBar";

export const metadata: Metadata = {
  title: "Kanban Method",
  description: "Kanban Methodology App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <MyThemeProvider>
        <CssBaseline/>
        <body>
          <Container sx={{height:"100%"}}>
            {children}
          </Container>
        </body>
      </MyThemeProvider>
    </html>
  );

}
