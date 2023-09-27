"use server"

import { options } from "@/app/api/auth/[...nextauth]/options"
import { serverProtectedRequest } from "@/app/services/serverRequest"
import { Session, getServerSession } from "next-auth"


export async function initSession(){
    try{
        const session = await getServerSession(options)
        return session
    }
    catch(err){
        throw err
    }
    }


   export async function getConversationMessages(conversationId: string){
    const session = await initSession()
        try{
            const response = await serverProtectedRequest(`/messenger/conversation/${conversationId}`, 'GET', session)
            return response
        }
        catch(err){
            throw err
        }
    }


export async function sendMessage(receiver: string, message: string){
    const session = await initSession()
    try{
        const response = await serverProtectedRequest(`/messenger/send`, 'POST', session, {receiver, message})
        return response
    }
    catch(err){
        throw err
    }
}
