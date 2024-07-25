"use client"

import { useAuthStore } from "@/store/Auth/AuthStore";
import { useProjectStore } from "@/store/Projects/ProjectStore";
import { useTaskStore } from "@/store/Tasks/TaskStore";
import { Add, Close, PlusOne } from "@mui/icons-material";
import { Box, Button, Card, Modal, Paper, Stack, TextField, Typography } from "@mui/material";
import { FormEvent, useState } from "react";

const CreateTask = () => {

    const [modal,set_modal] = useState<boolean>(false)
    const [input,set_input] = useState<string>("")

    const createTask = useTaskStore((state)=>(state.method.create))
    const refreshTasks = useTaskStore((state)=>(state.method.refresh))
    const user_id = useAuthStore((state)=>(state.store.user?._id))
    const project_id = useProjectStore((state)=>(state.store.selectedProject?._id))

    const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        if(!user_id||!project_id){ 
            return
        }

        const created = await createTask({
            user_id,
            project_id,
            title: input,
            status: 0,
            contributors: [user_id]
        })

        if(!created){ return }
        await refreshTasks(project_id)
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
            Create task
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
                        Create Task
                    </Typography>

                    <TextField 
                        label="Name your task" 
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
 
export default CreateTask;