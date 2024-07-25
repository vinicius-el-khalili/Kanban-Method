import { TaskSchema } from "@/models/Task"
import { MongoDocument } from "@/types/MongoDocument"
import { create } from "zustand"

type TaskStore = {
    store: {
        project_id:string|null
        project_title:string|null
        tasks:(TaskSchema&MongoDocument)[]|null
    },
    method: {
        refresh:(project_id:string)=>Promise<void>
        create:(newTask:TaskSchema)=>Promise<boolean>
        patch:(
            _id:string,
            updates:{
                title?:string,
                status?:number,
                contributors?:string[]
            }
        )=>Promise<boolean>
        delete:(_id:string)=>Promise<boolean>
    }
}

export const useTaskStore = create<TaskStore>()((set,get)=>({
    store:{
        project_id:null,
        project_title:null,
        tasks:null
    },
    method:{
        
        refresh:async(project_id)=>{

            const res = await fetch(`/api/projects/project/${project_id}/tasks`,{
                method:"GET",
                headers:{
                    "Accept":"application/json",
                    "Content-Type":"application/json",
                },
            })
            if(!res||res.status!=200){ return }
            const tasks:(TaskSchema&MongoDocument)[] = await res.json()
            set((state)=>({
                store:{...state.store,
                    tasks
                }
            }))

        },
        create:async(newTask)=>{

            const res = await fetch("/api/tasks",{
                method:"POST",
                headers:{
                    "Accept":"application/json",
                    "Content-Type":"application/json",
                },
                body: JSON.stringify(newTask)
            })
            if(!res||res.status!=200){ return false }
            return true

        },
        patch:async(_id,updates)=>{

            const res = await fetch(`/api/tasks/${_id}`,{
                method:"PATCH",
                headers:{
                    "Accept":"application/json",
                    "Content-Type":"application/json",
                },
                body: JSON.stringify(updates)
            })
            if(!res||res.status!=200){ return false }
            return true
            
        },
        delete: async(_id)=>{

            const res = await fetch(`/api/tasks/${_id}`,{
                method:"DELETE",
                headers:{
                    "Accept":"application/json",
                    "Content-Type":"application/json",
                },
            })
            if(!res||res.status!=200){ return false }
            return true

        }

    }
}))
