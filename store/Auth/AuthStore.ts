import { UserSchema } from "@/models/User";
import { MongoDocument } from "@/types/MongoDocument";
import { create } from "zustand";

type AuthStore = {
    store:{
        authenticated:boolean
        token:string|null,
        user:UserSchema&MongoDocument|null
    },
    method:{
        signin:(email:string,password:string)=>Promise<number>
        signup:(params:{email:string,password:string,username:string})=>Promise<number>
    }
}

export const useAuthStore = create<AuthStore>((set)=>({
    store:{
        authenticated:false,
        token:null,
        user:null
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

            if(!res){ return 0 }
            const status = res.status
            if(status!=200){
                const data = await res.json()
                console.log(status,data)
                return status
            };
            console.log(200,"ok")
            
            const data:{
                token: string,
                user: UserSchema&MongoDocument
            } = await res.json()
            
            set((state)=>({
                store:{...state.store,
                    authenticated: true,
                    token: data.token,
                    user: data.user
                }
            }))
            return 200

        },
        signup: async ({email,username,password})=>{

            const res = await fetch("/api/users/signup",{
                method:"POST",
                headers:{
                    "Accept":"application/json",
                    "Content-Type":"application/json",
                },
                body: JSON.stringify({email,username,password})
            })

            if(!res){ return 0 }
            const status = res.status
            if(status!=200){
                const data = await res.json()
                console.log(status,data)
                return status
            }
            console.log(200,"ok")

            const data:{
                token: string,
                user: UserSchema&MongoDocument
            } = await res.json()

            set((state)=>({
                store:{...state.store,
                    authenticated: true,
                    token: data.token,
                    user: data.user
                }
            }))

            return 200

        }
    }
}))