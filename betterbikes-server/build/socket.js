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
exports.emitSocketEvent = exports.createSocketConnection = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_services_1 = require("./services/auth.services");
var ChatEventEnum;
(function (ChatEventEnum) {
    ChatEventEnum["JOIN_CHAT_EVENT"] = "join_chat";
    ChatEventEnum["TYPING_EVENT"] = "typing";
    ChatEventEnum["STOP_TYPING_EVENT"] = "stop_typing";
    ChatEventEnum["LEAVE_CHAT_EVENT"] = "leave_chat";
})(ChatEventEnum || (ChatEventEnum = {}));
const mountJoinChatEvent = (socket) => {
    socket.on(ChatEventEnum.JOIN_CHAT_EVENT, (chatId) => {
        console.log(`User joined the chat 🤝. chatId: `, chatId);
        socket.chatId = chatId; // Store the chatId on the socket
        socket.join(chatId);
    });
};
const mountParticipantTypingEvent = (socket) => {
    socket.on(ChatEventEnum.TYPING_EVENT, (data) => {
        const { chatId, userId } = data;
        socket.in(chatId).emit(ChatEventEnum.TYPING_EVENT, data);
    });
};
const mountParticipantStoppedTypingEvent = (socket) => {
    socket.on(ChatEventEnum.STOP_TYPING_EVENT, (data) => {
        const { chatId, userId } = data;
        socket.in(chatId).emit(ChatEventEnum.STOP_TYPING_EVENT, data);
    });
};
const createSocketConnection = (io) => {
    return io.on("connection", (socket) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const token = socket.handshake.auth.token;
            if (!token) {
                socket.disconnect();
            }
            const decodedToken = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            const user = yield (0, auth_services_1.checkUserType)(decodedToken.id);
            if (!user) {
                socket.disconnect();
            }
            socket.user = user.user || user.oAuthUser;
            socket.join(socket.user.id);
            socket.emit("connected", { message: "connected" });
            console.log("User connected: ", socket.user.name);
            mountJoinChatEvent(socket);
            mountParticipantTypingEvent(socket);
            mountParticipantStoppedTypingEvent(socket);
            socket.on("disconnect", () => {
                console.log("User disconnected: ", socket.user.name);
            });
        }
        catch (err) {
            console.log(err);
        }
    }));
};
exports.createSocketConnection = createSocketConnection;
const emitSocketEvent = (req, roomId, event, payload) => {
    req.app.get("io").in(roomId).emit(event, payload);
};
exports.emitSocketEvent = emitSocketEvent;
