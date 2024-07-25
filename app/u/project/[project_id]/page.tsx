"use client"

import Taeko from "@/components/layout/grids&layouts/Taeko";
import CreateTask from "@/components/tasks/CreateTask";
import KanbanGrid from "@/components/tasks/KanbanGrid";
import { useAuthStore } from "@/store/Auth/AuthStore";
import { useProjectStore } from "@/store/Projects/ProjectStore";
import { useEffect } from "react";

const Page = ({ params }: { params: { project_id: string } }) => {

    const { project_id } = params
    const selectedProject = useProjectStore((state)=>(state.store.selectedProject))
    const initializeProjectPageByID = useProjectStore((state)=>(state.method.initializeProjectPageByID))
    const authenticated = useAuthStore((state)=>(state.store.authenticated))

    useEffect(()=>{
        ;(async()=>{
            if(selectedProject||!authenticated){ return }
            await initializeProjectPageByID(project_id)
        })();
    },[])

    return (
        <>
        {authenticated&&selectedProject&&
        <Taeko 
        title={`Projects > ${selectedProject.title}`}
        buttons={[<CreateTask/>]}
        >
            <KanbanGrid/>
        </Taeko>
        }
        </>
    );
}
 
export default Page;