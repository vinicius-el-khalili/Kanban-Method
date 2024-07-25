import { TaskSchema } from "@/models/Task";
import { useTaskStore } from "@/store/Tasks/TaskStore";
import { MongoDocument } from "@/types/MongoDocument";
import { Autorenew, Check, Delete, HourglassBottom } from "@mui/icons-material";
import { Accordion, AccordionActions, AccordionSummary, Avatar, Box, Button, Card, CardHeader, Divider, IconButton, Stack, Typography } from "@mui/material";
import TaskDeleteButton from "./TaskCardButtons/TaskDeleteButton";

const TaskCard = ({task}:{
    task:TaskSchema&MongoDocument
}) => {

    const patchTask = useTaskStore((state)=>(state.method.patch))

    return (
        <Accordion>

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
                    disabled:task.status==0,
                    color:"info",
                    size:"small"
                }}>
                    <HourglassBottom/>
                </IconButton>

                <IconButton {...{
                    disabled:task.status==1,
                    color:"warning",
                    size:"small"
                }}>
                    <Autorenew/>
                </IconButton>

                <IconButton {...{
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