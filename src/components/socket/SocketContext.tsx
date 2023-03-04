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
  const socket = io(`${process.env.NEXT_PUBLIC_WS_URL}`, {
    extraHeaders: {
      authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
  socket.emit("joinRooms");

  useEffect(() => {
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

const useSocket = () => useContext(SocketContext).socket;

export { SocketProvider, useSocket };
