import { TaskSchema } from "@/models/Task";
import { useTaskStore } from "@/store/Tasks/TaskStore";
import { MongoDocument } from "@/types/MongoDocument";
import { Autorenew, Check, Delete, HourglassBottom } from "@mui/icons-material";
import { Accordion, AccordionActions, AccordionSummary, Avatar, Box, Button, Card, CardHeader, Divider, IconButton, Stack, Typography } from "@mui/material";
import TaskDeleteButton from "./TaskCardButtons/TaskDeleteButton";
import { Dispatch, SetStateAction } from "react";

const TaskCard = ({task,selectedTaskID,set_selectedTaskID}:{
    task:TaskSchema&MongoDocument
    selectedTaskID:string|null
    set_selectedTaskID:Dispatch<SetStateAction<string|null>>
}) => {

    const patchTask = useTaskStore((state)=>(state.method.patch))
    const refreshTasks = useTaskStore((state)=>(state.method.refresh))

    const setStatus = async(status:number)=>{
        await patchTask(task._id,{status})
        await refreshTasks(task.project_id)
        set_selectedTaskID(null)
    }

    return (
        <Accordion
        expanded={task._id==selectedTaskID}
        onChange={(e,exp)=>{
            if(exp){
                set_selectedTaskID(task._id)    
            }else{
                set_selectedTaskID(null)
            }
        }}
        >

            <AccordionSummary>
                <Box {...{
                    display:"grid",
                    gridTemplateColumns:"1fr auto",
                    width:"100%"
                }}>
                    <Box {...{
                        display:"flex",
                        alignItems:"center",
                    }}>
                        <Typography>{task.title}</Typography>
                    </Box>
                    <Box {...{
                        display:"flex",
                        alignItems:"center",
                    }}>

                        {task.status==0&&
                        <HourglassBottom {...{
                            color:"inherit",
                            sx:{height:18,width:18,opacity:.5},
                        }}/>}

                        {task.status==1&&
                        <Autorenew {...{
                            color:"warning",
                            sx:{height:18,width:18},
                        }}/>}

                        {task.status==2&&
                        <Check {...{
                            color:"success",
                            sx:{height:18,width:18},
                        }}/>}

                    </Box>
                </Box>
            </AccordionSummary>

            <AccordionActions sx={{justifyContent:"center"}}>

                <TaskDeleteButton {...{
                    task_id: task._id,
                    project_id: task.project_id
                }}/>
                <Divider orientation="vertical" flexItem />

                <IconButton {...{
                    onClick:()=>setStatus(0),
                    disabled:task.status==0,
                    color:"info",
                    size:"small"
                }}>
                    <HourglassBottom/>
                </IconButton>

                <IconButton {...{
                    onClick:()=>setStatus(1),
                    disabled:task.status==1,
                    color:"warning",
                    size:"small",
                }}>
                    <Autorenew/>
                </IconButton>

                <IconButton {...{
                    onClick:()=>setStatus(2),
                    disabled:task.status==2,
                    color:"success",
                    size:"small"
                }}>
                    <Check/>
                </IconButton>

            </AccordionActions>
        </Accordion>
        
    );
}
 
export default TaskCard;