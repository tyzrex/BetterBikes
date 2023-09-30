import jwt from "jsonwebtoken";
import { prisma } from "./config/prisma";
import { checkUserType } from "./services/auth.services";

import { Server, Socket } from "socket.io";
import { Request } from "express";

enum ChatEventEnum {
  JOIN_CHAT_EVENT = "join_chat",
  TYPING_EVENT = "typing",
  STOP_TYPING_EVENT = "stop_typing",
  LEAVE_CHAT_EVENT = "leave_chat",
}

interface ChatSocket extends Socket {
  chatId: string;
}

type ChatEvent = {
  chatId: string;
};

type TypingEvent = ChatEvent & {
  userId: string;
};

type StopTypingEvent = ChatEvent & {
  userId: string;
};

const mountJoinChatEvent = (socket: ChatSocket) => {
  socket.on(ChatEventEnum.JOIN_CHAT_EVENT, (chatId: string) => {
    console.log(`User joined the chat 🤝. chatId: `, chatId);
    socket.chatId = chatId; // Store the chatId on the socket
    socket.join(chatId);
  });
};

const mountParticipantTypingEvent = (socket: ChatSocket) => {
  socket.on(ChatEventEnum.TYPING_EVENT, (data: TypingEvent) => {
    const { chatId, userId } = data;
    socket.in(chatId).emit(ChatEventEnum.TYPING_EVENT, data);
  });
};

const mountParticipantStoppedTypingEvent = (socket: ChatSocket) => {
  socket.on(ChatEventEnum.STOP_TYPING_EVENT, (data: StopTypingEvent) => {
    const { chatId, userId } = data;
    socket.in(chatId).emit(ChatEventEnum.STOP_TYPING_EVENT, data);
  });
};



interface IAccessToken {
  id: string;
  iat: number;
  exp: number;
}
export const createSocketConnection = (io: any) => {
  return io.on("connection", async (socket: any) => {
    try {
      const token = socket.handshake.auth.token;

      if (!token) {
        socket.disconnect();
      }

      const decodedToken = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      ) as IAccessToken;
      const user = await checkUserType(decodedToken.id);

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
    } catch (err) {
      console.log(err);
    }
  });
};

export const emitSocketEvent = (
  req: Request,
  roomId: string,
  event: any,
  payload: any
) => {

  req.app.get("io").in(roomId).emit(event, payload);
};
