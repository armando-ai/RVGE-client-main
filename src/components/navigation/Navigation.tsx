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
import { useSession } from "src/hooks";

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
    setTimeout(() => {
      sendEmit();
    }, 2000);
  }
  async function sendEmit() {
    socket.emit("notifications",  { uuid :localStorage.getItem("uuid") });
    socket.emit("joinNotifications", { uuid: localStorage.getItem("uuid") });

    setSendNotifications(true);
  }
  const [notifications, setNotifications] = useState<any>([]);
  useEffect(() => {
    socket.on("createdRoom", (data: any) => {
      setChatRoom(data);
    });
    socket.on("uuid", (data: any) => {
      localStorage.setItem("uuid", data);
    });
    socket.on("trades", (notification: any) => {
      console.log(notification);
      setNotifications((prev: any) => [...prev, notification]);
    });
    socket.on("chats", (notification: any) => {
      console.log(notification);
      setNotifications((prev: any) => [...prev, notification]);
    });
    return () => {
      socket.disconnect();
    };
  }, []);
  function removeNotification(notification: any) {
    // const updatedItems = notifications.map((item: any) => {
    //   return {
    //     ...item,
    //     animated: true,
    //   };
    // });
    // setNotifications(updatedItems);
    setTimeout(() => {
      setNotifications(notifications.filter((n: any) => n !== notification));
    }, 5000);
  }
  const activeChats = [{}];
  return (
    <div>
      <Messaging setRoom={setRoom} delRoom={delRoom}></Messaging>
      {chatRoom !== "" && chatRoom && (
        <ChatRoom delRoom={delRoom} room={chatRoom}></ChatRoom>
      )}
      {notifications !== undefined &&
        notifications.map(
          (notification: { id: any; animated: boolean }, index: number) => {
            console.log(notification);
            if (index === notifications.length - 1) {
              removeNotification(notifications.at(0));
            }
            return (
              <NotificationCard
                delRoom={delRoom}
                setRoom={setRoom}
                notification={notification}
                removeNotification={removeNotification}
                top={index * 100}
              />
            );
          }
        )}

      <DesktopNavigation
        selected={selected}
        links={NavigationLinks}
        className={`hidden lg:flex`}
      />
    </div>
  );
};
