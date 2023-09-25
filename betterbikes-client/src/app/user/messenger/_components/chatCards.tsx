import { convertToLocalTimeHours } from "@/lib/localTime";
import Image from "next/image";
import { ISelectedConversation } from "../../interfaces/chats";

interface Props {
  name: string;
  message: string;
  date: string;
  unread: number;
  image?: string;
  setCurrentChat: React.Dispatch<React.SetStateAction<any>>;
  chat: ISelectedConversation;
}

export default function ChatCards(props: Props) {
  return (
    <>
      <div
        onClick={() => props.setCurrentChat(props.chat)}
        className="entry cursor-pointer rounded-full hover:bg-gray-100 xl:bg-white md:mb-4 lg:rounded-sm transition-colors ease-in-out p-4 flex xl:shadow-md"
      >
        <div className="flex-2">
          <div className="w-12 h-12 relative text-center">
            {props.image ? (
              <Image
                className="w-12 h-12 rounded-full mx-auto"
                src={props.image}
                alt="chat-user"
              />
            ) : (
              <div className="w-12 h-12 rounded-full mx-auto bg-gray-200 flex-center">
                {props.name ? props.name.charAt(0) : ""}
              </div>
            )}
            <span className="absolute w-4 h-4 bg-green-400 rounded-full right-0 bottom-0 border-2 border-white"></span>
            <small className="mt-2 text-center lg:hidden">{props.name}</small>
          </div>
        </div>
        <div className="flex-1 px-2 hidden lg:block">
          <div className="truncate w-32">
            <span className="text-gray-800">
              {props.name ? props.name : ""}
            </span>
          </div>
          <div className="truncate w-40 xl:w-64">
            <small className="text-gray-600">
              {props.message ? props.message : ""}
            </small>
          </div>
        </div>
        <div className="flex-2 text-right hidden lg:block">
          <div>
            <small className="text-gray-500">
              {props.date ? convertToLocalTimeHours(props.date) : ""}
            </small>
          </div>
          <div>
            {/* <small className="text-xs bg-red-500 text-white rounded-full h-6 w-6 leading-6 text-center inline-block">
              {props.unread ? props.unread : ""}
            </small> */}
          </div>
        </div>
      </div>
    </>
  );
}
