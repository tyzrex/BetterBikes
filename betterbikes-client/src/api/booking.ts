"use server"

import { options } from "@/app/api/auth/[...nextauth]/options"
import { serverProtectedRequest } from "@/app/services/serverRequest"
import {  getServerSession } from "next-auth"
import { revalidatePath } from "next/cache"


export async function initSession(){
    try{
        const session = await getServerSession(options)
        return session
    }
    catch(err){
        throw err
    }
    }


export async function bookVehicle(
    formData: any
){
    const session = await initSession()
    try{
        const response = await serverProtectedRequest(`/booking/book-vehicle`, 'POST', session, formData)

        return response
    }
    catch(err){
        throw err
    }
}

export async function acceptBookingRequest(
    bookingId: string
){
    const session = await initSession()
    try{
        const response = await serverProtectedRequest(`/booking/accept-booking-request/${bookingId}`, 'POST', session)
    if(response){
            revalidatePath('/user/rent-requests')
        }
        return response
    }
    catch(err){
        throw err
    }
}


export async function revalidate(
    path : string
)
{
    revalidatePath(path)
}