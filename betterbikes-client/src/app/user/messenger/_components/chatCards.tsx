import Image from "next/image";

interface Props {
  name: string;
  message: string;
  date: string;
  unread: number;
  image?: string;
}

export default function ChatCards(props: Props) {
  return (
    <>
      <div className="entry cursor-pointer bg-white mb-4 rounded p-4 flex shadow-md">
        <div className="flex-2">
          <div className="w-12 h-12 relative">
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
          </div>
        </div>
        <div className="flex-1 px-2">
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
        <div className="flex-2 text-right">
          <div>
            <small className="text-gray-500">
              {props.date ? props.date : ""}
            </small>
          </div>
          <div>
            <small className="text-xs bg-red-500 text-white rounded-full h-6 w-6 leading-6 text-center inline-block">
              {props.unread ? props.unread : ""}
            </small>
          </div>
        </div>
      </div>
    </>
  );
}
