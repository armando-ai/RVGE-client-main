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
  if (typeof localStorage !== "undefined") {
    socket = io(`${process.env.NEXT_PUBLIC_WS_URL}`, {
      extraHeaders: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
  } else {
    socket = io(`${process.env.NEXT_PUBLIC_WS_URL}`);
  }

  useEffect(() => {
    socket.on("connect", (data: any) => {
      console.log("connected");
      console.log(socket);
      socket.removeAllListeners();
    });
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
