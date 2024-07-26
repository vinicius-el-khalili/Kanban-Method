"use client"

import { useProjectStore } from "@/store/Projects/ProjectStore";
import { Add, Close, PlusOne } from "@mui/icons-material";
import { Box, Button, Card, Modal, Paper, Stack, TextField, Typography } from "@mui/material";
import { FormEvent, useState } from "react";

const CreateProject = () => {

    const [modal,set_modal] = useState<boolean>(false)
    const [input,set_input] = useState<string>("")
    const create = useProjectStore((state)=>(state.method.create))

    const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await create(input)
        set_modal(false)
        set_input("")
    }

    return (
        <>
        <Button
        onClick={()=>set_modal(true)}
        startIcon={<Add/>}
        variant="contained"
        color="inherit"
        >
            list
        </Button>
        <Modal 
            open={modal} 
            onClose={()=>{
                set_modal(false)
                set_input("")
            }}
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
            <form onSubmit={handleSubmit}>
                <Stack spacing={3}>

                    <Typography
                    color="primary"
                    variant="h5">
                        New list
                    </Typography>

                    <TextField 
                        label="list name" 
                        variant="standard"
                        value={input}
                        onChange={e=>set_input(e.target.value)}
                    />

                    <Button 
                    disabled={input.length<3}
                    type="submit"
                    variant="contained" 
                    startIcon={<Add/>}>
                        Add
                    </Button>

                </Stack>
            </form>  
            </Card>
        </Modal>
        </>
    );
}
 
export default CreateProject;