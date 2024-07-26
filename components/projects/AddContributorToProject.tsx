"use client"

import { getContributorByLogin } from "@/fetchers/getContributorByLogin";
import { Contributor } from "@/models/Project";
import { useProjectStore } from "@/store/Projects/ProjectStore";
import { Add, Search } from "@mui/icons-material";
import { Avatar, Box, Button, Card, Modal, Stack, TextField, Typography } from "@mui/material";
import { ChangeEvent, FormEvent, useState } from "react";

const AddContributorToProject = () => {

    const [modal,set_modal] = useState<boolean>(false)
    const [input,set_input] = useState<string|null>(null)
    const [contributor,set_contributor] = useState<Contributor|null>(null)
    const [warning,set_warning] = useState<string|null>(null)

    const addContributerToProject = useProjectStore((state)=>(state.method.addContributerToProject))

    const handleSearch = async () => {

        if(!input){ return }
        const contributor = await getContributorByLogin(input)
        if(!contributor){
            set_warning("User not found")
            return
        }
        set_contributor(contributor)

    }

    const handleSubmit = async ()=> {

        if(!contributor){ return }
        const add = await addContributerToProject(contributor)
        if(!add){ return }
        onClose()

    }

    const onChange = (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        set_warning(null)
        if(contributor){set_contributor(null)}
        set_input(e.target.value)
    }

    const onClose = ()=>{
        set_modal(false)
        set_input(null)
        set_contributor(null)
        set_warning(null)
    }

    return (
        <>
        <Button
        onClick={()=>set_modal(true)}
        startIcon={<Add/>}
        variant="contained"
        color="inherit"
        >
            CONTRIBUTOR
        </Button>
        <Modal 
            open={modal} 
            onClose={onClose}
        >
            <Card {...{
                sx:{
                    position:"absolute",
                    top:"50%",
                    left:"50%",
                    transform:"translate(-50%,-50%)",
                    p:6
                }
            }}>
                <Stack spacing={3} maxWidth={300}>

                    <Typography
                    fontWeight="bold"
                    color="primary"
                    variant="h5">
                        Add Contributor to Project
                    </Typography>

                    <TextField
                        label="User login" 
                        variant="standard"
                        value={input?input:""}
                        onChange={onChange}
                        color={contributor?"success":warning?"error":"primary"}
                        helperText={
                            <Typography fontWeight="bold" color="error">
                                {warning}
                            </Typography>
                        }
                        focused={(!!warning||!!contributor)?true:undefined}
                    />

                    {!contributor&&
                    <Button
                    onClick={handleSearch}
                    type="submit"
                    variant="outlined" 
                    startIcon={<Search/>}
                    disabled={!input||input?.length<3}>
                    </Button>}
                    
                    {contributor&&
                    <Box {...{
                        display:"grid",
                        gridTemplateColumns:"auto 1fr",
                        alignItems:"center",
                        gap:2
                    }}>
                       <Avatar>{contributor.username[0]}</Avatar> 
                       <Typography>{contributor.username}</Typography>
                    </Box>}

                    {contributor&&
                    <Button
                    onClick={handleSubmit}
                    type="submit"
                    variant="contained" 
                    startIcon={<Add/>}>
                        add contributor
                    </Button>}

                </Stack>
            </Card>    
        </Modal>
        </>
    );
}
 
export default AddContributorToProject;