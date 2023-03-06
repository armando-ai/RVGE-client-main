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

export const Navigation = (props: any) => {
  const [selected, setSelected] = useState("Home");
  const [openChats, setOpenChats] = useState(false);
  const date = new Date();

  const [chatRoom, setChatRoom] = useState<any>([]);
  const socket = useSocket();

  function delRoom() {
    setChatRoom([]);
  }
  function setRoom(data: any) {
    let rooms = [<ChatRoom delRoom={delRoom} room={data}></ChatRoom>];
    setChatRoom(rooms);
  }

  useEffect(() => {
    socket.on("createdRoom", (data: any) => {
      setChatRoom((prev: any) => [
        <ChatRoom delRoom={delRoom} room={data}></ChatRoom>,
      ]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const activeChats = [{}];
  return (
    <div>
      <Messaging setRoom={setRoom}></Messaging>

      {chatRoom}

      <DesktopNavigation
        selected={selected}
        links={NavigationLinks}
        className={`hidden lg:flex`}
      />
    </div>
  );
};
