import { Contributor } from "@/models/Project"

export const getContributorByLogin = async (login:string) => {

    const res = await fetch(`/api/users/search/${login}`,{
        method:"GET",
        headers:{
            "Accept":"application/json",
            "Content-Type":"application/json",
        },
    })
    if (!res||res.status!=200){ return false }
    const contributor:Contributor = await res.json()
    return contributor

}