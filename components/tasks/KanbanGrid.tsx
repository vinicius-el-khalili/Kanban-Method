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
            gridTemplateColumns:"repeat(3,1fr)",
            height:"100%",
            gap:4
        }}>
            <Column 
            selectedTaskID={selectedTaskID}
            set_selectedTaskID={set_selectedTaskID}
            title={<>to do</>} 
            tasks={!tasks?[]:tasks.filter(task=>task.status==0)}/>

            <Column 
            selectedTaskID={selectedTaskID}
            set_selectedTaskID={set_selectedTaskID}
            title={<>doing</>} 
            tasks={!tasks?[]:tasks.filter(task=>task.status==1)}/>

            <Column 
            selectedTaskID={selectedTaskID}
            set_selectedTaskID={set_selectedTaskID}
            title={<>done</>} 
            tasks={!tasks?[]:tasks.filter(task=>task.status==2)}/>

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
            overflow:"hidden"
        }}>
            <Paper>
            <Typography {...{
                fontSize:"large",
                justifyContent:"center",
                textAlign:"center",
                sx:{
                    p:.5,
                    borderRadius:1,
                }
            }}>
                {title}
            </Typography>
            </Paper>

            <Box {...{
                sx:{overflowY:"scroll"},
                height:"100%",
                pt:.4,
                display:"flex",
                flexDirection:"column",
                gap:.5
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