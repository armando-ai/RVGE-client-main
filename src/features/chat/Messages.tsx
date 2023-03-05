import React, { useEffect, useState } from "react";

import {
  ChevronUpIcon as ArrowUpIcon,
  ChatBubbleBottomCenterTextIcon,
} from "@heroicons/react/24/outline";
import RoomCard from "./roomCard";
import { useSocket } from "src/components/socket/SocketContext";

const Messages = (props: any) => {
  const socket = useSocket();
  const [openChats, setOpenChats] = useState(false);
  const [chats, setChats] = useState<any>([]);
  // useEffect(() => {
  //   document.addEventListener("click", () => {
  //     window.alert("hello");
  //   });
  // }, []);

  useEffect(() => {
    socket.on("joinedRooms", (data: any) => {
      const chatSessions = JSON.parse(JSON.stringify(data));

      console.log(chatSessions, chatSessions.length);
      setChats(chatSessions);
    });

    return () => {
      socket.disconnect();
    };
  }, []);
  // const [fetch, setfetch] = useState(second)
  const [first, setFirst] = useState(false);
  if (openChats && first == false) {
    socket.emit("joinRooms", {});
    setFirst(true);
  }
  return (
    <div
      id="messageTab"
      className={`${
        openChats === true && "h-[60%!important]"
      } smooth fixed right-4 bottom-0 z-[9999] h-[6%] w-[25%]  overflow-hidden rounded-md bg-slate-300 ease-in-out`}
    >
      <div
        onClick={() => {
          setOpenChats(!openChats);
        }}
        className=" w-full  overflow-hidden  border-b-2 border-b-slate-900 p-[3%]"
      >
        <h1 className="flex flex-row overflow-hidden">
          Messaging
          <ChatBubbleBottomCenterTextIcon className="ml-1 w-5" />
          <ArrowUpIcon
            className={`${
              openChats === true && "rotate-180"
            } smooth ml-auto h-full w-7 cursor-pointer overflow-hidden`}
          />
        </h1>
      </div>

      <div id="messageRooms" className="h-[52vh] overflow-y-auto">
        {openChats === true &&
          chats.length !== 0 &&
          chats.map((chat: any) => (
            <RoomCard setChatRoom={props.setChatRoom} chat={chat} />
          ))}
      </div>
    </div>
  );
};

export default Messages;
