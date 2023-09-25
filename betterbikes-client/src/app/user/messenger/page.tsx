"use client";
import { useSocket } from "@/app/provider/SocketProvider";
import ChatCards from "./_components/chatCards";
import ChatMessage from "./_components/chatMessage";
import MyMessage from "./_components/myMessage";
import { AiOutlineSend } from "react-icons/ai";
import { useEffect, useState } from "react";
import { GetRequest, PostRequest } from "@/app/services/httpRequest";
import { useSession } from "next-auth/react";
import { IChatsResponse, ISelectedConversation } from "../interfaces/chats";

export default function MessengerPage() {
  const socket = useSocket();
  const session = useSession();

  const [messages, setMessages] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [selectedChat, setSelectedChat] = useState<ISelectedConversation>();
  const [chats, setChats] = useState<IChatsResponse>();
  const [senderInfo, setSenderInfo] = useState<any>();
  const [receiverInfo, setReceiverInfo] = useState<any>();

  const getMessages = async (conversationId: string) => {
    const response = await GetRequest(
      `/messenger/conversation/${conversationId}`
    );
    setMessages(response.data);
  };
  const getConversations = async () => {
    const response = await GetRequest("/messenger/get-conversations");
    setChats(response.data);
  };

  const sendMessage = async () => {
    if (message) {
      const response = await PostRequest("/messenger/send", {
        receiver:
          selectedChat?.profileOneId === session?.data?.user?.id
            ? selectedChat?.profileTwoId
            : selectedChat?.profileOneId,
        message: message,
      });
    }
  };

  useEffect(() => {
    socket?.on("message", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });
  }, [socket]);

  useEffect(() => {
    if (selectedChat) {
      getMessages(selectedChat.id);
    }
  }, [selectedChat]);

  useEffect(() => {
    getConversations();
  }, []);

  return (
    <>
      <div className="h-[80vh] w-full flex flex-col md:flex-row gap-10 antialiased text-main-foreground overflow-hidden">
        <div className="w-auto h-auto md:h-full md:border-r md:pr-4 md:border-r-gray-200">
          <h1 className="text-2xl font-bold mb-4">Chats</h1>

          <div className="flex flex-row lg:flex-col gap-4">
            {chats?.conversations.map((chat) => {
              return (
                <ChatCards
                  key={chat.id}
                  chat={chat}
                  name={
                    chat.profileOne.name === session?.data?.user?.name
                      ? chat.profileTwo.name
                      : chat.profileOne.name
                  }
                  message={chat.directMessages[0].content}
                  date={chat.directMessages[0].createdAt}
                  unread={2}
                  setCurrentChat={setSelectedChat}
                />
              );
            })}
          </div>
        </div>

        <div className="w-full h-full flex flex-col ">
          <div className="flex-grow flex flex-row min-h-0 ">
            {selectedChat ? (
              <section className="flex flex-col flex-auto ">
                <div className="chat-header px-6 py-4 flex flex-row flex-none justify-between items-center shadow">
                  <div className="flex-center">
                    <div className="w-12 h-12 mr-4 relative flex flex-shrink-0">
                      <div className="w-12 h-12 rounded-full mx-auto bg-gray-200 flex-center">
                        {selectedChat?.profileOne.name ===
                        session?.data?.user?.name
                          ? selectedChat?.profileTwo.name[0]
                          : selectedChat?.profileOne.name[0]}
                      </div>
                    </div>
                    <div className="text-sm">
                      <p className="font-bold">
                        {selectedChat?.profileOne.name ===
                        session?.data?.user?.name
                          ? selectedChat?.profileTwo.name
                          : selectedChat?.profileOne.name}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="chat-body p-4 flex-1 overflow-y-scroll justify-end">
                  {messages.map((message: any, index) => {
                    return (
                      <>
                        {message.sender === session?.data?.user?.id ? (
                          <MyMessage message={message.message} />
                        ) : (
                          <ChatMessage
                            message={message.message}
                            name={
                              selectedChat?.profileOne.name ===
                              session?.data?.user?.name
                                ? selectedChat?.profileTwo.name
                                : selectedChat?.profileOne.name
                            }
                          />
                        )}
                      </>
                    );
                  })}
                </div>
                <div className="chat-footer flex-none">
                  <div className="flex flex-row items-center p-4">
                    <div className="relative flex-grow">
                      <label>
                        <input
                          className="rounded-full py-2 pl-3 pr-10 w-full border 0 focus:outline-none text-gray-200 "
                          type="text"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Type your message here"
                        />
                      </label>
                    </div>
                    <button
                      onClick={() => {
                        sendMessage();
                      }}
                      className="accent-btn p-2 rounded-full ml-5"
                    >
                      <AiOutlineSend className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </section>
            ) : (
              <div className="flex-1 flex flex-col justify-center items-center">
                <p className="text-2xl font-bold">
                  Select a chat to start messaging
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
