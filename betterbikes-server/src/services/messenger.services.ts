import { prisma } from "../config/prisma";
import { Response } from "express";
export const getOrCreateConversation = async (
    sender: string,
    receiver: string,
    res: Response
) => {
  try {
    const senderId = sender;
    const receiverId = receiver;

    console.log(sender, receiver);

    const conversation = await prisma.conversation.findFirst({
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
      }
    } else {
      const newConversation = await prisma.conversation.create({
        data: {
          profileOneId: senderId,
          profileTwoId: receiver,
        },
      
      });
      return {
        message: "Conversation created",
        conversation: newConversation,
      }
    }
  } catch (err: any) {
throw err
  }
};