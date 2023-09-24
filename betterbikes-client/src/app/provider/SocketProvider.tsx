"use client";

import { getSession } from "next-auth/react";
import { revalidatePath } from "next/cache";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import io from "socket.io-client";

const getSocket = async () => {
  const session = await getSession();
  if (!session) {
    throw new Error("User session not found.");
  }

  const socket = io(process.env.API_URL || "http://localhost:3000", {
    // Additional socket.io options
    // withCredentials: true,
    // ...
    auth: {
      token: session.user.access_token,
    },
  });

  return socket;
};

const SocketContext = createContext<{
  socket: ReturnType<typeof io> | null;
}>({
  socket: null,
});

const useSocket = () => {
  const { socket } = useContext(SocketContext);
  return socket;
};

const SocketProvider = (props: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<ReturnType<typeof io> | null>(null);

  const shouldFetch = useRef(true);

  const initializeSocket = async () => {
    try {
      const newSocket = await getSocket();
      setSocket(newSocket);
    } catch (error) {
      console.error("Error initializing socket:", error);
    }
  };

  useEffect(() => {
    if (shouldFetch.current) {
      initializeSocket();
    }
    shouldFetch.current = false;
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {props.children}
    </SocketContext.Provider>
  );
};

export { useSocket, SocketProvider };
