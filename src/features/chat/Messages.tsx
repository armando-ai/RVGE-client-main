import React, { useEffect, useState } from "react";

import {
  ChevronUpIcon as ArrowUpIcon,
  ChatBubbleBottomCenterTextIcon,
} from "@heroicons/react/24/outline";
import RoomCard from "./roomCard";

const Messages = (props: any) => {
  const [openChats, setOpenChats] = useState(false);
  // useEffect(() => {
  //   document.addEventListener("click", () => {
  //     window.alert("hello");
  //   });
  // }, []);
  return (
    <div
      id="messageTab"
      className={`${
        openChats === true && "h-[60%!important]"
      } smooth fixed right-4 bottom-0 z-[9999] h-[6%] w-[25%]  overflow-hidden rounded-md bg-slate-300 ease-in-out`}
    >
      <div className=" w-full  overflow-hidden  border-b-2 border-b-slate-900 p-[3%]">
        <h1 className="flex flex-row overflow-hidden">
          Messaging
          <ChatBubbleBottomCenterTextIcon className="ml-1 w-5" />
          <ArrowUpIcon
            onClick={() => {
              setOpenChats(!openChats);
            }}
            className={`${
              openChats === true && "rotate-180"
            } smooth ml-auto h-full w-7 cursor-pointer overflow-hidden`}
          />
        </h1>
      </div>

      <div id="messageRooms" className="h-[52vh] overflow-y-auto">
        {openChats === true &&
          props.chats.map((chat: any) => <RoomCard chat={chat} />)}
      </div>
    </div>
  );
};

export default Messages;
