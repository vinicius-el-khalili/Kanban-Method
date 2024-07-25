"use client"

import Taeko from "@/components/layout/grids&layouts/Taeko";
import CreateTask from "@/components/tasks/CreateTask";
import KanbanGrid from "@/components/tasks/KanbanGrid";
import { useProjectStore } from "@/store/Projects/ProjectStore";
import { useEffect } from "react";

const Page = ({ params }: { params: { project_id: string } }) => {

    const { project_id } = params
    const selectedProject = useProjectStore((state)=>(state.store.selectedProject))
    const initializeProjectPageByID = useProjectStore((state)=>(state.method.initializeProjectPageByID))

    useEffect(()=>{

        if(selectedProject){ return }
        ;(async()=>{
            await initializeProjectPageByID(project_id)
        })();

    },[])

    return (
        <>
        <Taeko 
        title={`Projects > ${selectedProject?selectedProject.title:""}`}
        buttons={[<CreateTask/>]}
        >
            <KanbanGrid/>
        </Taeko>
        </>
    );
}
 
export default Page;