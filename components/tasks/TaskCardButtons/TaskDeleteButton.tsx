"use client"

import { useTaskStore } from "@/store/Tasks/TaskStore";
import { Delete } from "@mui/icons-material";
import { IconButton } from "@mui/material";

const TaskDeleteButton = ({task_id,project_id}:{
    task_id:string
    project_id:string
}) => {

    const deleteTask = useTaskStore((state)=>(state.method.delete))
    const refreshTasks = useTaskStore((state)=>(state.method.refresh))

    const onClick = async()=>{
        const del = await deleteTask(task_id)
        if(!del){ return }
        await refreshTasks(project_id)
    }

    return (
        <IconButton {...{
            onClick,
            color:"inherit",
            sx:{opacity:.5},
            size:"small"
        }}>
            <Delete/>
        </IconButton>
    );

}
 
export default TaskDeleteButton;