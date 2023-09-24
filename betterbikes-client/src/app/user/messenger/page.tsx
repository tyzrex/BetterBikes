import ChatCards from "./_components/chatCards";
import ChatMessage from "./_components/chatMessage";
import MyMessage from "./_components/myMessage";

export default function MessengerPage() {
  return (
    <>
      <div className="h-[80vh] w-full flex antialiased text-main-foreground overflow-hidden">
        <div className="flex-1 flex flex-col">
          <main className="flex-grow flex flex-row min-h-0">
            <section className="flex flex-col flex-auto ">
              <div className="chat-header px-6 py-4 flex flex-row flex-none justify-between items-center shadow">
                <div className="flex">
                  <div className="w-12 h-12 mr-4 relative flex flex-shrink-0">
                    <img
                      className="shadow-md rounded-full w-full h-full object-cover"
                      src="https://randomuser.me/api/portraits/women/33.jpg"
                      alt=""
                    />
                  </div>
                  <div className="text-sm">
                    <p className="font-bold">Scarlett Johansson</p>
                    <p>Active 1h ago</p>
                  </div>
                </div>
              </div>
              <div className="chat-body p-4 flex-1 overflow-y-scroll justify-end">
                <ChatMessage />
                <MyMessage />
                <ChatMessage />
                <MyMessage />
                <ChatMessage />
                <MyMessage />
                <ChatMessage />
                <MyMessage />
                <ChatMessage />
                <MyMessage />
                <ChatMessage />
                <MyMessage />
                <MyMessage />
              </div>
              <div className="chat-footer flex-none">
                <div className="flex flex-row items-center p-4">
                  <div className="relative flex-grow">
                    <label>
                      <input
                        className="rounded-full py-2 pl-3 pr-10 w-full border 0 focus:outline-none text-gray-200 "
                        type="text"
                        value=""
                        placeholder="Type your message here"
                      />
                    </label>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </>
  );
}
