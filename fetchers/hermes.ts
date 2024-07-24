type _Method_ = "GET" | "POST" | "PUT" | "DELETE" 
type _Accept_ = "application/json" | "*/*"
type _ContentType_ = "application/json" | "application/x-www-form-urlencoded"
type _Authorization_ = string | null
type _Token_ = string
type _Body_ = string | URLSearchParams | null
type _Headers_ = {
    "Accept":_Accept_
    "Content-Type":_ContentType_
    "Authorization"?:_Authorization_
}


export const hermes = async (

    service:string,
    method:_Method_,
    endpoint:string,
    options?: {
        accept?:_Accept_,
        contentType?:_ContentType_,
        token?:_Token_,
        body?:_Body_
    }
    
) => {


    let Accept:_Accept_ = options?.accept ? options.accept : "application/json"
    let ContentType:_ContentType_ = options?.contentType ? options.contentType : "application/json"
    let Authorization:_Authorization_ = options?.token ? `Bearer ${options.token}` : null

    let headers: HeadersInit&_Headers_ = {
        "Accept": Accept,
        "Content-Type": ContentType,
        ...(Authorization && { "Authorization": Authorization }),
    }
    
    let body:_Body_ = options?.body ? options.body : null


    try {

        //let server_url = process.env.NEXT_PUBLIC_SERVER_URL
        let server_url = ""
        let response = await fetch (`${server_url}${endpoint}`, {

            method,
            headers,
            ...(body && { body }),

        })
        
        if (response) {
            
            let data: any | false

            switch(response.status) {
                case 200:
                    console.log(`@${service}: success`)
                    data = await response.json()
                    return { data, status: 200 }

                case 422:
                    console.log(`@${service}: 422`)
                    let err = await response.json()
                    console.log(err)
                    return { data: false, status: 422 }

                default:
                    console.log(`@${service}: ${response.status}`)
                    return { data:false, status:response.status }
            }
            
        }

    } catch(err) {

        console.log(`@${service}: fetch fail`)
        return { data: false, status: false }

    }

}