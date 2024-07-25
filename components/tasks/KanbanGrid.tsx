import { TaskSchema } from "@/models/Task";
import { useTaskStore } from "@/store/Tasks/TaskStore";
import { MongoDocument } from "@/types/MongoDocument";
import { Box, Paper, Stack, Typography } from "@mui/material";
import TaskCard from "./TaskCard";
import { Autorenew, Check, HourglassBottom } from "@mui/icons-material";

const KanbanGrid = () => {

    const tasks = useTaskStore((state)=>(state.store.tasks))

    return (
        <>
        <Box {...{
            display:"grid",
            gridTemplateColumns:"repeat(3,1fr)",
            height:"100%"
        }}>
            <Column 
            title={<><HourglassBottom/></>} 
            tasks={!tasks?[]:tasks.filter(task=>task.status==0)}/>

            <Column 
            title={<><Autorenew/></>} 
            tasks={!tasks?[]:tasks.filter(task=>task.status==1)}/>

            <Column 
            title={<><Check/></>} 
            tasks={!tasks?[]:tasks.filter(task=>task.status==2)}/>

        </Box>
        </>
    );
}
 
export default KanbanGrid;

const Column = ({title,tasks}:{
    title:JSX.Element,
    tasks:(TaskSchema&MongoDocument)[]|null,
}) => {

    return (

        <Box {...{
            display:"grid",
            gridTemplateRows:"auto 1fr",
            height:"100%",
            overflow:"hidden",
        }}>
            <Typography {...{
                fontSize:"large",
                justifyContent:"center",
                textAlign:"center",
                sx:{
                    p:.5,
                }
            }}>
                {title}
            </Typography>

            <Box {...{
                sx:{overflowY:"scroll"},
                height:"100%",
                p:1,
                display:"flex",
                flexDirection:"column",
                gap:.5
            }}>
                {tasks&&tasks.map((task,i)=>(
                    <TaskCard key={`grdtskcrd${i}`} task={task}/>
                ))}
            </Box>

        </Box>
    );
}