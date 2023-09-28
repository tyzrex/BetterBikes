"use server"

import { options } from "@/app/api/auth/[...nextauth]/options"
import { serverProtectedRequest } from "@/app/services/serverRequest"
import {  getServerSession } from "next-auth"


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

export async function getConversationRecommendations(
    name: string,
){
    const session = await initSession()
    try{
        // const response = await serverProtectedRequest(`/messenger/create-conversation-suggestions?name=${name}`, 'GET', session)
        const responsee = await fetch(`http://localhost:5000/messenger/create-conversation-suggestions?name=${name}`, {
            method: "GET",
            cache: "no-cache",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${session?.user.access_token}`
            }
        })
        const response = await responsee.json()
        return response
    }
    catch(err){
        throw err
    }
}
