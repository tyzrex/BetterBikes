import { getConversationMessages, getUserConversations, sendMessage } from "../controller/messenger.controller"
import { validateToken } from "../middleware/validateToken"

export const messengerRoutes = (app: any) => {
    app.post("/messenger/send", validateToken, sendMessage)
    app.get("/messenger/get-conversations", validateToken, getUserConversations)
    app.get("/messenger/conversation/:id", validateToken, getConversationMessages)
}