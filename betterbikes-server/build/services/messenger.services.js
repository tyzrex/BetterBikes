"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrCreateConversation = void 0;
const prisma_1 = require("../config/prisma");
const getOrCreateConversation = (sender, receiver, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const senderId = sender;
        const receiverId = receiver;
        console.log(sender, receiver);
        const conversation = yield prisma_1.prisma.conversation.findFirst({
            where: {
                OR: [
                    {
                        profileOneId: senderId,
                        profileTwoId: receiverId,
                    },
                    {
                        profileOneId: receiverId,
                        profileTwoId: senderId,
                    },
                ],
            },
        });
        if (conversation !== null) {
            return {
                message: "Conversation already exists",
                conversation: conversation,
            };
        }
        else {
            const newConversation = yield prisma_1.prisma.conversation.create({
                data: {
                    profileOneId: senderId,
                    profileTwoId: receiver,
                },
            });
            return {
                message: "Conversation created",
                conversation: newConversation,
            };
        }
    }
    catch (err) {
        throw err;
    }
});
exports.getOrCreateConversation = getOrCreateConversation;
