import { Session } from "next-auth"
import "server-only"

export async function serverProtectedRequest (url: string, method: string,session?: Session|null  ,body?: any, caching?: any) {
    try{

        const headers = new Headers(
            {
                'Content-Type': 'application/json',
            }
        )
        if(session){
            headers.append('Authorization', `Bearer ${session.user.access_token}`)
        }

        

        const response = await fetch(
        `${process.env.API_URL}${url}`, {
        method: method,
        headers: headers,
        body: JSON.stringify(body),
        cache: caching ? caching : 'no-cache'
    })
    const data = await response.json()
    if(response.status === 200){
          return data
    }
    else{
        throw {
            status: response.status,
            message: data.message
        }
    }
   
    }
    catch(err:any){
        throw err
    }
}


export async function serverRequest (url: string, method: string  ,body?: any) {
    try{
        const headers = new Headers(
            {
                'Content-Type': 'application/json',
            }
        )
        console.log(`${process.env.API_URL}${url}`)
        
        const response = await fetch(
        `${process.env.API_URL}${url}`, {
        method: method,
        headers: headers,
        body: JSON.stringify(body)
    })
    const data = await response.json()
    console.log(data)
    if(response.status === 200){
          return data
    }
    else{

        throw {
            status: response.status,
            message: data.message
        }
    }
   
    }
    catch(err:any){
        throw err
    }
}
    