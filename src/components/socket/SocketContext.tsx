import React, { createContext, useContext, useEffect } from "react";
import io from "socket.io-client";

type SocketContextType = {
  socket: any;
};

const SocketContext = createContext<SocketContextType>({
  socket: null,
});

type SocketProviderProps = {
  children: React.ReactNode;
};

const SocketProvider = ({ children }: SocketProviderProps) => {
  let socket: any;

  // Retrieve the socket instance from localStorage
  const socketData = localStorage.getItem("socket");
  if (typeof window !== "undefined" && socketData) {
    socket = io(`${process.env.NEXT_PUBLIC_WS_URL}`, {
      extraHeaders: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });

    // Restore the socket instance's properties
    const { id, connected } = JSON.parse(socketData);
    socket.id = id;
    if (connected) {
      socket.connect();
    }
  } else {
    socket = io(`${process.env.NEXT_PUBLIC_WS_URL}`);
  }

  useEffect(() => {
    return () => {
      // Save the socket instance to localStorage
      if (typeof window !== "undefined" && socket) {
        localStorage.setItem(
          "socket",
          JSON.stringify({ id: socket.id, connected: socket.connected })
        );
      }

      socket.disconnect();
    };
  }, [socket]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

const useSocket = () => useContext(SocketContext).socket;

export { SocketProvider, useSocket };
