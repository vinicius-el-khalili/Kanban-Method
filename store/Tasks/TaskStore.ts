import { create } from "zustand"

type TaskStore = {
    store: {
        project_id: string|null
        tasks:string[]|null
    }
}

export const useTaskStore = create<TaskStore>()((set,get)=>({
    store:{
        project_id:null,
        tasks:null
    }
}))
