import { Contributor, ProjectSchema } from "@/models/Project"
import { create } from "zustand"
import { useAuthStore } from "../Auth/AuthStore"
import { MongoDocument } from "@/types/MongoDocument"
import { TaskSchema } from "@/models/Task"
import { useTaskStore } from "../Tasks/TaskStore"

type ProjectStore = {
    store: {
        projects:(ProjectSchema&MongoDocument)[]|null
        selectedProject:ProjectSchema&MongoDocument|null
        pageInitialized:boolean
    },
    method: {
        refresh:()=>Promise<void>
        create:(title:string)=>Promise<void>
        delete:(_id:string)=>Promise<void>
        patch:(updatedProject:ProjectSchema&MongoDocument)=>Promise<boolean>
        initializeProjectPageByID:(_id:string)=>Promise<void>
        addContributerToProject:(contributor:Contributor)=>Promise<boolean>
    }
}

export const useProjectStore = create<ProjectStore>()((set,get)=>({
    store: {
        projects:null,
        selectedProject:null,
        pageInitialized:false
    },
    method: {

        refresh:async()=>{

            const user = useAuthStore.getState().store.user
            if(!user){ return }

            const res = await fetch(`/api/projects/user/${user._id}`,{
                method:"GET",
                headers:{
                    "Accept":"application/json",
                    "Content-Type":"application/json",
                },
            })
            if(!res||res.status!=200){ return }

            const projects:(ProjectSchema&MongoDocument)[]=await res.json()
            set((state)=>({
                store:{...state.store,
                    projects
                }
            }))

        },

        create:async(title)=>{

            const user = useAuthStore.getState().store.user
            if(!user){ return }

            const newProject:ProjectSchema={
                user_id: user._id,
                title,
                contributors: [{
                    user_id: user._id,
                    username: user.username,
                    avatar: user.avatar,
                    color: user.color
                }]
            }
            
            const res = await fetch("/api/projects",{
                method:"POST",
                headers:{
                    "Accept":"application/json",
                    "Content-Type":"application/json",
                },
                body: JSON.stringify(newProject)
            })
            if(!res||res.status!=200){ return }
            get().method.refresh()
            
        },

        delete:async(_id)=>{

            const user = useAuthStore.getState().store.user
            if(!user){ return }
            const res = await fetch(`/api/projects/project/${_id}`,{
                method:"DELETE",
                headers:{
                    "Accept":"application/json",
                    "Content-Type":"application/json",
                },
            })
            if(!res||res.status!=200){ return }
            get().method.refresh()

        },

        patch: async(updatedProject)=>{

            const res = await fetch(`/api/projects/project/${updatedProject._id}`,{
                method:"PATCH",
                headers:{
                    "Accept":"application/json",
                    "Content-Type":"application/json",
                },
                body: JSON.stringify(updatedProject)
            })
            if(!res||res.status!=200){ return false }
            return true

        },

        initializeProjectPageByID: async(_id)=>{
            
            const res = await fetch(`/api/projects/project/${_id}`,{
                method:"GET",
                headers:{
                    "Accept":"application/json",
                    "Content-Type":"application/json",
                },
            })
            if(!res||res.status!=200){ return }
            const project:ProjectSchema&MongoDocument = await res.json()

            await useTaskStore.getState().method.refresh(_id)

            set((state)=>({
                store:{...state.store,
                    selectedProject:project,
                    pageInitialized:true
                }
            }))

        },

        addContributerToProject: async(contributor) => {

            const selectedProject = get().store.selectedProject
            if(!selectedProject){ return false }         
            const patch = get().method.patch
            const updatedProject:ProjectSchema&MongoDocument = {
                ...selectedProject,
                contributors:[...selectedProject.contributors,
                    contributor
                ]
            }
            const result = await patch(updatedProject)
            if(!result){ return false }
            set((state)=>({
                store:{...state.store,
                    selectedProject:updatedProject
                }
            }))
            return true
            
        }
    }
}))