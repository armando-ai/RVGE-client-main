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
  const [notifications, setNotifications] = useState<any>([]);
  useEffect(() => {
    socket.on("createdRoom", (data: any) => {
      setChatRoom(data);
    });

    socket.on("trades", (notification: any) => {
      console.log(notification);
      setNotifications((prev: any) => [...prev, notification]);
      removeNotification(notification);
    });
    socket.on("chats", (notification: any) => {
      console.log(notification);
      setNotifications((prev: any) => [...prev, notification]);
      removeNotification(notification);
    });
    return () => {
      socket.disconnect();
    };
  }, []);
  function removeNotification(notification: any) {
    setTimeout(() => {
      setNotifications(
        notifications.filter((n: any) => n.createdAt !== notification.createdAt)
      );
    }, 6000);
  }
  const activeChats = [{}];
  return (
    <div>
      <Messaging setRoom={setRoom} delRoom={delRoom}></Messaging>
      {chatRoom !== "" && chatRoom && (
        <ChatRoom delRoom={delRoom} room={chatRoom}></ChatRoom>
      )}

      {notifications.map((notification: { id: any }, index: number) => {
        console.log(index);
        return (
          <NotificationCard
            key={index}
            notification={notification}
            removeNotification={removeNotification}
            top={index * 10}
            className={`goLeft  top-[${
              index * 10
            }%] fixed right-4 z-[9999] mt-5 h-[10%] w-[24%]`}
          />
        );
      })}

      <DesktopNavigation
        selected={selected}
        links={NavigationLinks}
        className={`hidden lg:flex`}
      />
    </div>
  );
};
