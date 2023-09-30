// NotificationProvider.js
"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { useSocket } from "./SocketProvider";
import { useToast } from "@/components/ui/use-toast";
import { revalidatePath } from "next/cache";
import { revalidate } from "@/api/booking";

export const NotificationContext = createContext({
  notifications: [],
  //   markAsRead: (id: any) => {}, // a dummy function for default value
});

const NotificationProvider = (props: { children: React.ReactNode }) => {
  const [notifications, setNotifications] = useState([]);
  const { toast } = useToast();
  const socket = useSocket();

  useEffect(() => {
    // Listen for notifications from the socket
    socket?.on("booking", (data) => {
      toast({
        title: "New Booking",
        description: `${data.name} has booked your ${data.vehicleName}`,
        className: "bg-yellow-400 text-white",
      });
      //revaldiate the booking page
      //   revalidate("/user/rent-requests");
    });

    // Cleanup socket connection on component unmount
    return () => {
      socket?.disconnect();
    };
  }, [socket]);

  //   const markAsRead = (id) => {
  //     setNotifications((prevNotifications) =>
  //       prevNotifications.map((notification) =>
  //         notification.id === id ? { ...notification, read: true } : notification
  //       )
  //     );
  //   };

  const value = {
    notifications,
    // markAsRead,
  };

  return (
    <NotificationContext.Provider value={value}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
