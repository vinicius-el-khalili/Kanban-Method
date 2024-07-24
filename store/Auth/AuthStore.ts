import { create } from "zustand";

type AuthStore = {
    state:{
        authenticated:boolean
        token:string|null
    },
    method:{
        signin:(email:string,password:string)=>Promise<void>
        signup:(email:string,password:string,username:string)=>Promise<void>
    }
}

export const useAuthStore = create<AuthStore>((set)=>({
    state:{
        authenticated:false,
        token:null
    },
    method:{
        signin: async (email,password)=>{

            const res = await fetch("/api/users/signin",{
                method:"POST",
                headers:{
                    "Accept":"application/json",
                    "Content-Type":"application/json",
                },
                body: JSON.stringify({email,password})
            })
            if(!res){ return }
            const data = await res.json()
            
        },
        signup: async ()=>{}
    }
}))