import { DesktopNavigation } from "./desktop/Desktop";
import { MobileNavigation } from "./mobile/Mobile";
import { NavigationLinks } from "./constants";
import { useEffect, useState } from "react";
import React from "react";
import {
  ChevronUpIcon as ArrowUpIcon,
  ChatBubbleBottomCenterTextIcon,
} from "@heroicons/react/24/outline";
import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/solid";
import RoomCard from "src/features/chat/roomCard";
import Messaging from "src/features/chat/Messages";
import ChatRoom from "src/features/chat/chatRoom";
import { io } from "socket.io-client";
import { useSocket } from "../socket/SocketContext";
import NotificationCard from "src/features/chat/NotifcationCard";

export const Navigation = (props: any) => {
  const [selected, setSelected] = useState("Home");
  const [sendNotifications, setSendNotifications] = useState(false);
  const date = new Date();

  const [chatRoom, setChatRoom] = useState<any>("");
  const socket = useSocket();

  function delRoom() {
    setChatRoom("");
  }
  function setRoom(data: any) {
    delRoom();
    setChatRoom(data);
  }
  if (sendNotifications === false) {
    socket.emit("notifications", {});
    socket.emit("joinNotifications", {});

    setSendNotifications(true);
  }
  const [notification, setNotification] = useState<any>([]);
  useEffect(() => {
    socket.on("createdRoom", (data: any) => {
      setChatRoom(data);
    });
    socket.on("chats", (data: any) => {
      console.log(data);
      setNotification((prevState: any) => [...prevState, data]);
      setTimeout(() => {
        setNotification((prevState: any[]) =>
          prevState.filter((n: any) => n !== data)
        );
      }, 6000);
    });
    socket.on("trades", (data: any) => {
      console.log(data);
      setNotification((prevState: any) => [...prevState, data]);
      setTimeout(() => {
        setNotification((prevState: any[]) =>
          prevState.filter((n: any) => n !== data)
        );
      }, 6000);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  const activeChats = [{}];
  return (
    <div>
      <Messaging setRoom={setRoom} delRoom={delRoom}></Messaging>
      {chatRoom !== "" && chatRoom && (
        <ChatRoom delRoom={delRoom} room={chatRoom}></ChatRoom>
      )}
      <div className="fixed right-5 top-5 z-[9999] h-auto w-[300px] overflow-hidden">
        {notification.map((message: any, index: number) => (
          <NotificationCard
            key={index}
            setRoom={setRoom}
            delRoom={delRoom}
            className={index === notification.length - 1 ? "goLeft" : ""}
            notification={message}
          />
        ))}
      </div>

      <DesktopNavigation
        selected={selected}
        links={NavigationLinks}
        className={`hidden lg:flex`}
      />
    </div>
  );
};
