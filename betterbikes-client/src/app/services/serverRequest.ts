import { Session } from 'next-auth';

// import "server-only"

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
        cache: 'no-store'
    })
    
    if(response.status === 200){
        var data = await response.json()
          return data
    }
    //if response cannot be parsed as json, return the response

    else{
        throw {
            status: response.status,
            message: data ? data.message : "Something went wrong"
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
        
        const response = await fetch(
        `http://localhost:3000${url}`, {
        method: method,
        headers: headers,
        body: JSON.stringify(body),
        cache: 'no-store'
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
    