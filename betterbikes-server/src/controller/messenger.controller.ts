import {
  NextFunction,
  Request,
  Response,
} from 'express';

import { prisma } from '../config/prisma';
import { getOrCreateConversation } from '../services/messenger.services';
import { emitSocketEvent } from '../socket';
import AppError from '../utils/error';
import ErrorHandler from '../utils/errorType';

export const sendMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const senderId = res.locals.id;
    const receiverId = req.body.receiver;
    const message = req.body.message;


    const conversation = await getOrCreateConversation(
      senderId,
      receiverId,
      res
    );

    if(conversation) {
      const participants = [conversation.conversation.profileOneId, conversation.conversation.profileTwoId]

      const createMessage = await prisma.directMessage.create({
        data:{
          conversationId: conversation.conversation.id,
          memberId: senderId,
          content: message,
        }
      })

      console.log(createMessage);

      participants.forEach((participant) => {
        emitSocketEvent(req,participant.toString(), "message", {
          message: message,
          sender: senderId,
          receiver: receiverId,
        });
      }
      )
    }
    res.status(200).json({
      message: "Message sent",
    });
  } catch (err: any) {
       console.log(err);
    const errors = ErrorHandler(err);
 
    next(new AppError(errors.statusCode, errors.message));
  }
};


export const getUserConversations = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = res.locals.id;
    const conversations = await prisma.conversation.findMany({
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
  } catch (err: any) {

    const errors = ErrorHandler(err);
    next(new AppError(errors.statusCode, errors.message));
  }
}

export const getConversationMessages = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const conversationId = req.params.id;
    const messages = await prisma.directMessage.findMany({
      where: {
        conversationId: conversationId,
      },
      select:{
        memberId: true,
        content: true,
        createdAt: true,
        conversation:{
          select:{
            profileOneId: true,
            profileTwoId: true,
          }
        }
      }
    });

    const formattedData = messages.map((message: any) => {
      return {
        sender: message.memberId,
        message: message.content,
        receiver: message.conversation.profileOneId === message.memberId ? message.conversation.profileTwoId : message.conversation.profileOneId,
      }
    }
    )

    res.status(200).json(formattedData);
  } catch (err: any) {
    const errors = ErrorHandler(err);
    next(new AppError(errors.statusCode, errors.message));
  }
}

export const createConversation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const senderId = res.locals.id;
    const receiverId = req.body.receiver;
    console.log(senderId, receiverId);
    const conversation = await getOrCreateConversation(
      senderId,
      receiverId,
      res
    );
    res.status(200).json({
      conversation,
    });
  } catch (err: any) {
    const errors = ErrorHandler(err);
    next(new AppError(errors.statusCode, errors.message));
  }
}


export const createConversationSuggestions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const name = req.query.name as string;

    const suggestions = await prisma.profile.findMany({
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
  } catch (err: any) {
    const errors = ErrorHandler(err);
    next(new AppError(errors.statusCode, errors.message));
  }
}