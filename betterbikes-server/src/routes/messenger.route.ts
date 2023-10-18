import { createConversation, createConversationSuggestions, getConversationMessages, getUserConversations, sendMessage } from "../controller/messenger.controller"
import { validateToken } from "../middleware/validateToken"
import { Router } from "express"

const router = Router()

router.post("/send", validateToken, sendMessage)
router.get("/get-conversations", validateToken, getUserConversations)
router.get("/conversation/:id", validateToken, getConversationMessages)
router.post("/create-conversation", validateToken, createConversation)
router.get("/create-conversation-suggestions", validateToken, createConversationSuggestions)


export default router