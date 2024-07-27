import { TaskSchema } from "@/models/Task";
import { useTaskStore } from "@/store/Tasks/TaskStore";
import { MongoDocument } from "@/types/MongoDocument";
import { Box, Paper, Stack, Typography } from "@mui/material";
import TaskCard from "./TaskCard";
import { Autorenew, Check, HourglassBottom } from "@mui/icons-material";
import { Dispatch, SetStateAction, useState } from "react";

const KanbanGrid = () => {

    const tasks = useTaskStore((state)=>(state.store.tasks))
    const [selectedTaskID,set_selectedTaskID] = useState<string|null>(null)

    return (
        <>
        <Box {...{
            display:"grid",
            gridTemplateColumns:{
                sm:"1fr",
                md:"repeat(2,1fr)",
            },
            height:"100%",
            gap:4,
            overflow:"hidden"
        }}>
            <Column 
            selectedTaskID={selectedTaskID}
            set_selectedTaskID={set_selectedTaskID}
            title={
                <Typography color="GrayText">
                    <HourglassBottom color="inherit"/>
                </Typography>
            } 
            tasks={tasks}/>

            {/* <Column 
            selectedTaskID={selectedTaskID}
            set_selectedTaskID={set_selectedTaskID}
            title={<>doing</>} 
            tasks={!tasks?[]:tasks.filter(task=>task.status==1)}/> */}

            {/* <Column 
            selectedTaskID={selectedTaskID}
            set_selectedTaskID={set_selectedTaskID}
            title={
                <Typography color="GrayText">
                    <Check color="inherit"/>
                </Typography>
            } 
            tasks={!tasks?[]:tasks.filter(task=>task.status==2)}/> */}

        </Box>
        </>
    );
}
 
export default KanbanGrid;

const Column = ({title,tasks,selectedTaskID,set_selectedTaskID}:{
    title:JSX.Element
    tasks:(TaskSchema&MongoDocument)[]|null
    selectedTaskID:string|null
    set_selectedTaskID:Dispatch<SetStateAction<string|null>>
}) => {

    return (

        <Box {...{
            display:"grid",
            gridTemplateRows:"auto 1fr",
            height:"100%",
            overflow:"hidden",
            gap:1
        }}>
            <Paper elevation={5}>
            <Typography {...{
                fontSize:"large",
                justifyContent:"center",
                textAlign:"center",
                sx:{
                    pt:1,
                    borderRadius:1,
                }
            }}>
                {title}
            </Typography>
            </Paper>

            <Box {...{
                border:"1px solid yellow",
                sx:{overflowY:"scroll"},
                height:"100%",
                pt:.4,
                display:"flex",
                flexDirection:"column",
                gap:1
            }}>
                {tasks&&tasks.map((task,i)=>(
                    <TaskCard 
                    key={`grdtskcrd${i}`} 
                    task={task}
                    selectedTaskID={selectedTaskID}
                    set_selectedTaskID={set_selectedTaskID}/>
                ))}
            </Box>

        </Box>
    );
}