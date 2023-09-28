import { Session, getServerSession } from "next-auth";
import MessengerPage from "./messenger";
import { serverProtectedRequest } from "@/app/services/serverRequest";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { IChatsResponse } from "../interfaces/chats";

const getConversations = async (session: Session | null) => {
  const response = await serverProtectedRequest(
    "/messenger/get-conversations",
    "GET",
    session
  );
  return response;
};

export default async function Messenger() {
  const session = await getServerSession(options);
  const conversations: IChatsResponse = await getConversations(session);

  const conversationInfo = conversations?.conversations.map((conversation) => {
    if (conversation.profileOneId === session?.user?.id) {
      return {
        sender: conversation.profileOneId,
        senderName: conversation.profileOne.name,
        receiver: conversation.profileTwoId,
        receiverName: conversation.profileTwo.name,
        conversationId: conversation.id,
        lastMessage: conversation.directMessages[0].content,
        lastMessageDate: conversation.directMessages[0].createdAt,
      };
    } else {
      return {
        sender: conversation.profileTwoId,
        senderName: conversation.profileTwo.name,
        receiver: conversation.profileOneId,
        receiverName: conversation.profileOne.name,
        conversationId: conversation.id,
        lastMessage: conversation.directMessages[0].content,
        lastMessageDate: conversation.directMessages[0].createdAt,
      };
    }
  });

  return (
    <>
      <MessengerPage chats={conversations} info={conversationInfo} />
    </>
  );
}
