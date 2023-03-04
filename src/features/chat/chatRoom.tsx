import {
  ChevronUpIcon as ArrowUpIcon,
  ChatBubbleBottomCenterTextIcon,
  PaperAirplaneIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import UserChat from "./UserChat";
import OtherChat from "./OtherChat";
import { io } from "socket.io-client";

const ChatRoom = (props: any) => {
  const [openChats, setOpenChats] = useState(true);
  const [value, setValue] = useState("");
  const handleKeyDown = async (
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      await sendMessage(value);
    }
  };
  const handleInputChange = (event: any) => {
    setValue(event.target.value);

    if (event.target.value.trim().valueOf() === "" || !event.target.value) {
      event.target.style.height = "";
    }
    event.target.style.height = event.target.scrollHeight + "px";

    var scroll = document.getElementById("input");

    if (scroll !== null) {
      scroll.scrollTop = scroll.scrollHeight;
    }
  };
  useEffect(() => {
    let socket = io(`${process.env.NEXT_PUBLIC_WS_URL}`, {
      extraHeaders: {
        authorization: `Bearer ${localStorage?.getItem("accessToken")}`,
      },
    });
    socket.on("messages", async (data: any) => {
      console.log(data);
      await setChatMessages((prev) => [...prev, data]);
    });

    updateHeight();
  }, []);
  const updateHeight = () => {
    setTimeout(() => {
      var scroll = document.getElementById("messages");
      if (scroll !== null) {
        scroll.scrollTop = scroll.scrollHeight - scroll.clientHeight;
      }
    }, 500);
  };
  const sendMessage = async (message: string) => {
    let socket = io(`${process.env.NEXT_PUBLIC_WS_URL}`, {
      extraHeaders: {
        authorization: `Bearer ${localStorage?.getItem("accessToken")}`,
      },
    });
    const rawmessage = { roomId: props.room.id, message: message };
    console.log(rawmessage);
    socket.emit("message", "" + rawmessage);

    await setChatMessages((prev) => [...prev, rawmessage]);
    await setValue("");
    var text = document.getElementById("txt");
    if (text !== null) {
      text.style.height = "";
      text.style.height = text.scrollHeight + "px";
    }
    var text = document.getElementById("input");
    if (text !== null) {
      text.style.height = "";
      text.style.height = text.scrollHeight + "px";
    }

    var scroll = document.getElementById("messages");
    if (scroll !== null) {
      scroll.scrollTop = scroll.scrollHeight - scroll.clientHeight;
    }
  };

  const [ChatMessages, setChatMessages] = useState<any[]>([]);

  const elements = ChatMessages.map((message: any) =>
    message.userId === props.room.users[0].id ? (
      <OtherChat message={message.message}></OtherChat>
    ) : (
      <UserChat message={message.message}></UserChat>
    )
  );

  function delChat(id: string) {
    const parent = document.getElementById("chatRoom");
    const child = document.getElementById("chatId");
    console.log(parent);
    console.log(child);
    if (child !== null && parent?.contains(child)) {
      parent?.removeChild(child);
    }
    props.delRoom((prev: any) => []);
  }
  return (
    <div id="chatRoom">
      <div
        id="chatId"
        className={`${
          openChats === true && "h-[60%!important]"
        } smooth absolute right-[30%] bottom-0 z-[9999] h-[6%] w-[25%] overflow-hidden rounded-md bg-slate-300 ease-in-out`}
      >
        <div className=" float-left h-[7vh] w-full cursor-pointer border-b-2 border-b-slate-900 bg-slate-400 ">
          <div
            onClick={() => {
              setOpenChats(!openChats);
            }}
            className="relative  float-left h-full w-[90%]  p-[3%] text-start "
          >
            <h1 className="float-left ">XxTrenchxX</h1>

            <ChatBubbleBottomCenterTextIcon className=" relative float-left ml-1 w-5" />
          </div>

          {openChats === true ? (
            <ArrowUpIcon
              onClick={() => {
                setOpenChats(!openChats);
              }}
              className={`smooth mi-auto relative mt-[2.4%] w-7  rotate-180 cursor-pointer`}
            ></ArrowUpIcon>
          ) : (
            <XMarkIcon
              onClick={() => {
                delChat("");
              }}
              className="mi-auto relative mt-[2.4%] w-7  cursor-pointer "
            ></XMarkIcon>
          )}
        </div>

        <div className="flex h-[90%] w-full flex-col  items-end justify-end overflow-hidden ">
          <div
            id="messages"
            className="flex h-[48vh] w-full self-center overflow-y-auto  align-middle"
          >
            <div className="mt-auto  h-auto w-full ">{elements}</div>
          </div>
          <div
            id="input"
            className="h-[16%] w-full overflow-y-auto bg-slate-400 p-[3%]"
          >
            <textarea
              id="txt"
              className="relative float-left mt-1  h-[3vh] w-[85%] resize-none overflow-hidden rounded-md p-[1%]  font-normal leading-5 tracking-wide"
              value={value}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
            <PaperAirplaneIcon
              onClick={() => {
                sendMessage(value);
              }}
              className=" fixed ml-[21%] mt-1 h-[3.5vh] rotate-[-45deg] transform cursor-pointer rounded-full bg-slate-700 p-1 text-white hover:animate-pulse"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
