import { TaskSchema } from "@/models/Task";
import { useTaskStore } from "@/store/Tasks/TaskStore";
import { MongoDocument } from "@/types/MongoDocument";
import { Box, Stack, Typography } from "@mui/material";
import TaskCard from "./TaskCard";

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
            title={"Stuff"} 
            tasks={!tasks?[]:tasks.filter(task=>task.status==0)}/>

            <Column 
            title={"Doing"} 
            tasks={!tasks?[]:tasks.filter(task=>task.status==1)}/>

            <Column 
            title={"Done"} 
            tasks={!tasks?[]:tasks.filter(task=>task.status==2)}/>

        </Box>
        </>
    );
}
 
export default KanbanGrid;

const Column = ({title,tasks}:{
    title:string,
    tasks:(TaskSchema&MongoDocument)[]|null,
}) => {
    return (

        <Box {...{
            border:"1px solid red",
            p:2,
            display:"grid",
            gridTemplateRows:"auto 1fr",
            height:"100%",
            overflow:"hidden"
        }}>
            <Typography {...{
                variant:"h6" ,
                textAlign:"center",
                sx:{
                    pb:2
                }
            }}>
                {title}
            </Typography>

            <Box {...{
                border:"1px solid yellow",
                sx:{overflowY:"scroll"},
                height:"100%"
            }}>
                {tasks&&tasks.map((task,i)=>(
                    <TaskCard key={`grdtskcrd${i}`} task={task}/>
                ))}
                {tasks&&tasks.map((task,i)=>(
                    <TaskCard key={`grdtskcrd${i}`} task={task}/>
                ))}
                {tasks&&tasks.map((task,i)=>(
                    <TaskCard key={`grdtskcrd${i}`} task={task}/>
                ))}
            </Box>

        </Box>
    );
}