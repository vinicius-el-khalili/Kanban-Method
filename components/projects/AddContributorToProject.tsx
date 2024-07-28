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
    const selectedProject = useProjectStore((state)=>(state.store.selectedProject))

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
                <Stack spacing={1}>

                    <Stack direction="column" alignItems="center">
                        <Typography color="GrayText" variant="body2" textAlign="end">
                            Lists/
                        </Typography>
                        <Typography color="primary" textAlign="end" variant="body1">
                            {`${selectedProject?.title}`}
                        </Typography>
                    </Stack>

                    {/* <Typography fontWeight="light" variant="h6" textAlign="center">
                        Add Contributor
                    </Typography> */}

                    <Stack {...{spacing:2,pt:4}}>
                        <TextField
                            label="New Contributer"
                            placeholder="Contributor login"
                            autoComplete={""}
                            variant="outlined"
                            value={input?input:""}
                            onChange={onChange}
                            color={contributor?"success":warning?"error":"primary"}
                            helperText={
                                <Typography fontWeight="bold" color="error">
                                    {warning}
                                </Typography>
                            }
                            focused={(!!warning||!!contributor)?true:undefined}
                            autoFocus
                        />

                        {!contributor&&
                        <Button
                        onClick={handleSearch}
                        type="submit"
                        variant="contained" 
                        color="info"
                        startIcon={<Search/>}
                        disabled={!input||input?.length<3}>
                        </Button>}
                        
                        {contributor&&
                        <Box {...{
                            display:"grid",
                            gridTemplateColumns:"auto 1fr",
                            alignItems:"center",
                            gap:2,
                            pl:1,pr:1,pt:0,pb:2
                        }}>
                        <Avatar>{contributor.username[0]}</Avatar> 
                        <Typography>{contributor.username}</Typography>
                        </Box>}

                        {contributor&&
                        <Button
                        onClick={handleSubmit}
                        type="submit"
                        variant="contained"
                        color="success"
                        startIcon={<Add/>}>
                            add contributor
                        </Button>}
                    
                    </Stack>

                </Stack>
            </Card>    
        </Modal>
        </>
    );
}
 
export default AddContributorToProject;