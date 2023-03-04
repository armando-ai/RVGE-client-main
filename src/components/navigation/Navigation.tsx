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

export const Navigation = (props: any) => {
  const [selected, setSelected] = useState("Home");
  const [openChats, setOpenChats] = useState(false);
  const date = new Date();

  const [chatRoom, setChatRoom] = useState<any>([]);
  useEffect(() => {
    let socket = io(`${process.env.NEXT_PUBLIC_WS_URL}`, {
      extraHeaders: {
        authorization: `Bearer ${localStorage?.getItem("accessToken")}`,
      },
    });


    socket.on("joinedRooms", (data: any) => {
      console.log("joined??? -" + data);
    });
    socket.on("connected", (data) => {
      
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const [chats, setChat] = useState([
    {
      id: 1,
      from: "XxTrenchxX",
      lastMessage: {
        createdAt: date.toISOString(),
        message: "XxTrenchxX: i need a better offer",
      },
    },
    {
      id: 1,
      from: "XxTrenchxX",
      lastMessage: {
        createdAt: date.toISOString(),
        message: "XxTrenchxX: i need a better offer",
      },
    },
    {
      id: 1,
      from: "XxTrenchxX",
      lastMessage: {
        createdAt: date.toISOString(),
        message: "XxTrenchxX: i need a better offer",
      },
    },
    {
      id: 1,
      from: "XxTrenchxX",
      lastMessage: {
        createdAt: date.toISOString(),
        message: "XxTrenchxX: i need a better offer",
      },
    },
    {
      id: 1,
      from: "XxTrenchxX",
      lastMessage: {
        createdAt: date.toISOString(),
        message: "XxTrenchxX: i need a better offer",
      },
    },
    {
      id: 1,
      from: "XxTrenchxX",
      lastMessage: {
        createdAt: date.toISOString(),
        message: "XxTrenchxX: i need a better offer",
      },
    },
    {
      id: 1,
      from: "XxTrenchxX",
      lastMessage: {
        createdAt: date.toISOString(),
        message: "XxTrenchxX: i need a better offer",
      },
    },
    {
      id: 1,
      from: "XxTrenchxX",
      lastMessage: {
        createdAt: date.toISOString(),
        message: "XxTrenchxX: i need a better offer",
      },
    },
    {
      id: 1,
      from: "XxTrenchxX",
      lastMessage: {
        createdAt: date.toISOString(),
        message: "XxTrenchxX: i need a better offer",
      },
    },
    {
      id: 1,
      from: "XxTrenchxX",
      lastMessage: {
        createdAt: date.toISOString(),
        message: "XxTrenchxX: i need a better offer",
      },
    },
    {
      id: 1,
      from: "XxTrenchxX",
      lastMessage: {
        createdAt: date.toISOString(),
        message: "XxTrenchxX: i need a better offer",
      },
    },
  ]);
  // function delChat(game: any) {
  //   chats.splice(
  //     chats.findIndex((value: any) => value.id + "".includes(game + "")),
  //     1
  //   );
  //   console.log(chats);
  //   setChat(chats);

  //   //send del request for this game here
  // }
  const activeChats = [{}];
  return (
    <div>
      <Messaging chats={chats}></Messaging>

      {chatRoom}

      <DesktopNavigation
        selected={selected}
        links={NavigationLinks}
        className={`hidden lg:flex`}
      />
    </div>
  );
};
