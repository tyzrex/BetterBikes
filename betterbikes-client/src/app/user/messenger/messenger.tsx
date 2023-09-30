"use client";
import { useSocket } from "@/app/provider/SocketProvider";
import ChatCards from "./_components/chatCards";
import ChatMessage from "./_components/chatMessage";
import MyMessage from "./_components/myMessage";
import { AiOutlineSend } from "react-icons/ai";
import { useEffect, useState } from "react";
import { IChatsResponse, ISelectedConversation } from "../interfaces/chats";
import {
  getConversationMessages,
  getConversationRecommendations,
  sendMessage,
} from "@/api/messenger";
import { useToast } from "@/components/ui/use-toast";
interface Props {
  chats?: IChatsResponse;
  info?: (IChatInfo | undefined)[];
}

interface IChatInfo {
  sender: string;
  senderName: string;
  receiver: string;
  receiverName: string;
  conversationId: string;
  lastMessage: string;
  lastMessageDate: string;
}

export default function MessengerPage(props: Props) {
  const socket = useSocket();

  const [messages, setMessages] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [selectedChat, setSelectedChat] = useState<IChatInfo>();
  const [search, setSearch] = useState("");
  const [suggest, setSuggest] = useState<any>([]);

  const handleConversationSearch = (e: any) => {
    setSearch(e.target.value);
  };

  const handleClick = async () => {
    try {
      await sendMessage(selectedChat?.receiver as string, message);
      setMessage("");
    } catch (err) {
      console.log(err);
    }
  };
  const { toast } = useToast();

  useEffect(() => {
    socket?.on("message", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });
  }, [socket]);

  useEffect(() => {
    if (selectedChat) {
      // getMessages(selectedChat.conversationId);
      const getMessages = async (conversationId: string) => {
        await getConversationMessages(selectedChat.conversationId).then(
          (response) => {
            setMessages(response);
          }
        );
      };
      getMessages(selectedChat.conversationId);
    }
  }, [selectedChat]);

  useEffect(() => {
    //use debounce here

    if (search.length > 0) {
      const suggestions = async () => {
        await getConversationRecommendations(search).then((response) => {
          setSuggest(response);
        });
      };
      suggestions();
      console.log(suggest);
    } else {
      setSuggest([]);
    }
  }, [search.length]);

  return (
    <>
      <div className="h-[80vh] w-full flex flex-col md:flex-row gap-10 antialiased text-main-foreground overflow-hidden">
        <div className="w-auto h-auto md:h-full md:border-r md:pr-4 md:border-r-gray-200">
          <h1 className="text-2xl font-bold mb-4">Chats</h1>

          <div className="flex flex-row justify-between items-center mb-4 relative">
            <div className="flex-1 relative">
              <label>
                <input
                  className="rounded-md py-2 pl-3 pr-10 w-full border 0 focus:outline-none text-main-foreground "
                  type="text"
                  placeholder="Add Conversations"
                  onChange={handleConversationSearch}
                />
              </label>
            </div>
          </div>

          {suggest.suggestions ? (
            <div className="absolute bg-white rounded-md shadow-lg">
              {suggest?.suggestions.map((suggestion: any, index: number) => {
                return (
                  <div className="flex flex-row items-center" key={index}>
                    <div className="w-12 h-12 mr-4 relative flex flex-shrink-0">
                      <div className="w-12 h-12 rounded-full mx-auto bg-gray-200 flex-center">
                        {suggestion.name.charAt(0)}
                      </div>
                    </div>
                    <div className="text-sm">
                      <p className="font-bold">{suggestion.name}</p>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedChat(suggestion);
                      }}
                      className="accent-btn p-2 rounded-full ml-5"
                    >
                      <AiOutlineSend className="w-5 h-5" />
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            <></>
          )}

          <div className="flex flex-row lg:flex-col gap-4">
            {props?.info ? (
              props.info.map((chat: any, index: number) => {
                return (
                  <ChatCards
                    key={index}
                    chat={chat}
                    name={chat.receiverName}
                    message={chat.lastMessage}
                    date={chat.lastMessageDate}
                    unread={2}
                    setCurrentChat={setSelectedChat}
                  />
                );
              })
            ) : (
              <>
                <div className="flex-1 flex flex-col justify-center items-center">
                  <p className="text-2xl font-bold">
                    No chats available. Start a new chat adding people
                  </p>
                </div>
              </>
            )}
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
                        {selectedChat.receiverName.charAt(0)}
                      </div>
                    </div>
                    <div className="text-sm">
                      <p className="font-bold">{selectedChat.receiverName}</p>
                    </div>
                  </div>
                </div>
                <div className="chat-body p-4 flex-1 overflow-y-scroll justify-end">
                  {messages.map((message: any, index) => {
                    return (
                      <>
                        {message.sender === selectedChat.sender ? (
                          <MyMessage key={index} message={message.message} />
                        ) : (
                          <ChatMessage
                            key={index}
                            message={message.message}
                            name={selectedChat.receiverName}
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
                          className="rounded-md py-2 pl-3 pr-10 w-full border 0 focus:outline-none text-main-foreground "
                          type="text"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Type your message here"
                        />
                      </label>
                    </div>
                    <button
                      onClick={() => {
                        handleClick();
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
