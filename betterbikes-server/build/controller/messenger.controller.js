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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createConversationSuggestions = exports.createConversation = exports.getConversationMessages = exports.getUserConversations = exports.sendMessage = void 0;
const error_1 = __importDefault(require("../utils/error"));
const errorType_1 = __importDefault(require("../utils/errorType"));
const prisma_1 = require("../config/prisma");
const socket_1 = require("../socket");
const messenger_services_1 = require("../services/messenger.services");
const sendMessage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const senderId = res.locals.id;
        const receiverId = req.body.receiver;
        const message = req.body.message;
        const conversation = yield (0, messenger_services_1.getOrCreateConversation)(senderId, receiverId, res);
        if (conversation) {
            const participants = [conversation.conversation.profileOneId, conversation.conversation.profileTwoId];
            const createMessage = yield prisma_1.prisma.directMessage.create({
                data: {
                    conversationId: conversation.conversation.id,
                    memberId: senderId,
                    content: message,
                }
            });
            console.log(createMessage);
            participants.forEach((participant) => {
                (0, socket_1.emitSocketEvent)(req, participant.toString(), "message", {
                    message: message,
                    sender: senderId,
                    receiver: receiverId,
                });
            });
        }
        res.status(200).json({
            message: "Message sent",
        });
    }
    catch (err) {
        console.log(err);
        const errors = (0, errorType_1.default)(err);
        next(new error_1.default(errors.statusCode, errors.message));
    }
});
exports.sendMessage = sendMessage;
const getUserConversations = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = res.locals.id;
        const conversations = yield prisma_1.prisma.conversation.findMany({
            where: {
                OR: [
                    {
                        profileOneId: userId,
                    },
                    {
                        profileTwoId: userId,
                    },
                ],
            },
            include: {
                profileOne: {
                    select: {
                        name: true,
                    }
                },
                profileTwo: {
                    select: {
                        name: true,
                    }
                },
                directMessages: {
                    orderBy: {
                        createdAt: "desc",
                    },
                    select: {
                        content: true,
                        createdAt: true,
                    },
                    take: 1,
                },
            },
        });
        res.status(200).json({
            conversations,
        });
    }
    catch (err) {
        const errors = (0, errorType_1.default)(err);
        next(new error_1.default(errors.statusCode, errors.message));
    }
});
exports.getUserConversations = getUserConversations;
const getConversationMessages = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const conversationId = req.params.id;
        const messages = yield prisma_1.prisma.directMessage.findMany({
            where: {
                conversationId: conversationId,
            },
            select: {
                memberId: true,
                content: true,
                createdAt: true,
                conversation: {
                    select: {
                        profileOneId: true,
                        profileTwoId: true,
                    }
                }
            }
        });
        const formattedData = messages.map((message) => {
            return {
                sender: message.memberId,
                message: message.content,
                receiver: message.conversation.profileOneId === message.memberId ? message.conversation.profileTwoId : message.conversation.profileOneId,
            };
        });
        res.status(200).json(formattedData);
    }
    catch (err) {
        const errors = (0, errorType_1.default)(err);
        next(new error_1.default(errors.statusCode, errors.message));
    }
});
exports.getConversationMessages = getConversationMessages;
const createConversation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const senderId = res.locals.id;
        const receiverId = req.body.receiver;
        console.log(senderId, receiverId);
        const conversation = yield (0, messenger_services_1.getOrCreateConversation)(senderId, receiverId, res);
        res.status(200).json({
            conversation,
        });
    }
    catch (err) {
        const errors = (0, errorType_1.default)(err);
        next(new error_1.default(errors.statusCode, errors.message));
    }
});
exports.createConversation = createConversation;
const createConversationSuggestions = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const name = req.query.name;
        const suggestions = yield prisma_1.prisma.profile.findMany({
            where: {
                name: {
                    contains: name,
                    mode: "insensitive",
                },
            },
            select: {
                id: true,
                name: true,
            },
        });
        res.status(200).json({
            suggestions,
        });
    }
    catch (err) {
        const errors = (0, errorType_1.default)(err);
        next(new error_1.default(errors.statusCode, errors.message));
    }
});
exports.createConversationSuggestions = createConversationSuggestions;
