"use client"

import { useAuthStore } from "@/store/Auth/AuthStore";
import { useProjectStore } from "@/store/Projects/ProjectStore";
import { useTaskStore } from "@/store/Tasks/TaskStore";
import { Add } from "@mui/icons-material";
import { Button, Card, Modal, Stack, TextareaAutosize, Typography } from "@mui/material";
import { FormEvent, useState } from "react";
import MyTextarea from "../layout/grids&layouts/MyTextarea";

const CreateTask = () => {

    const [modal,set_modal] = useState<boolean>(false)
    const [input,set_input] = useState<string>("")

    const createTask = useTaskStore((state)=>(state.method.create))
    const refreshTasks = useTaskStore((state)=>(state.method.refresh))
    const user = useAuthStore((state)=>(state.store.user))
    const selectedProject = useProjectStore((state)=>(state.store.selectedProject))

    const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        if(!user||!selectedProject){ 
            return
        }

        const created = await createTask({
            user_id: user._id,
            project_id: selectedProject._id,
            title: input,
            status: 0,
            contributors:[{
                user_id: user._id,
                username: user.username,
                avatar: user.avatar,
                color: user.color
            }]
        })

        if(!created){ return }
        await refreshTasks(selectedProject._id)
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
            TASK
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

                    <Stack direction="column" alignItems="center">
                        <Typography color="GrayText" variant="body2" textAlign="end">
                            Lists/
                        </Typography>
                        <Typography color="primary" textAlign="end" variant="body1">
                            {`${selectedProject?.title}`}
                        </Typography>
                    </Stack>

                    <Typography fontWeight="light" variant="h6" textAlign="center">
                        Add Task
                    </Typography>
                    
                    <MyTextarea
                        value={input}
                        onChange={e=>set_input(e.target.value)}
                    />
                    
                    {/* <TextField
                        label="Description" 
                        variant="standard"
                        
                    /> */}

                    <Button 
                    disabled={input.length<3}
                    type="submit"
                    variant="contained" 
                    color="success"
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