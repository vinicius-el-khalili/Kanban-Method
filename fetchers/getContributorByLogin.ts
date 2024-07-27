import { Contributor } from "@/models/Project"
import { useAuthStore } from "@/store/Auth/AuthStore"
import { NextResponse } from "next/server"

export const getContributorByLogin = async (login:string) => {

    const token = useAuthStore.getState().store.token
    if(!token){ return false }    
    const res = await fetch(`/api/users/search/${login}`,{
        method:"GET",
        headers:{
            "Accept":"application/json",
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        },
    })
    if (!res||res.status!=200){ return false }
    const contributor:Contributor = await res.json()
    return contributor

}