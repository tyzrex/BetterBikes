"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const messenger_controller_1 = require("../controller/messenger.controller");
const validateToken_1 = require("../middleware/validateToken");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post("/send", validateToken_1.validateToken, messenger_controller_1.sendMessage);
router.get("/get-conversations", validateToken_1.validateToken, messenger_controller_1.getUserConversations);
router.get("/conversation/:id", validateToken_1.validateToken, messenger_controller_1.getConversationMessages);
router.post("/create-conversation", validateToken_1.validateToken, messenger_controller_1.createConversation);
router.get("/create-conversation-suggestions", validateToken_1.validateToken, messenger_controller_1.createConversationSuggestions);
exports.default = router;
