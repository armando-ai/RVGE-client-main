import {
  BellAlertIcon,
  ChatBubbleBottomCenterTextIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import React from "react";
import { getToken, request } from "src/utils";

const NotificationCard = (props: any) => {
  const router = useRouter();
  const createCurrentRoom = async () => {
    await getToken();
    const data = await request("/getroom/" + props.notification.roomId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });

    setTimeout(() => {
      props.delRoom("");
    }, 25);
    setTimeout(() => {
      props.setRoom(data);
    }, 50);
  };
  const value = "top-[" + props.top + "px!important]";
  return (
    <div
      onClick={() => {
        props.notification.type.includes("chat")
          ? createCurrentRoom()
          : router.push("/rtrades");
      }}
      className={`${props.top === 0 && "goRight"} ${
        props.notification.animated === false && "goLeft"
      } fixed right-4 z-[9999] ${value} smooth mt-5 max-h-full min-h-[10%] w-[24%] cursor-pointer  flex-col content-start justify-start overflow-hidden rounded-md bg-slate-400 p-[1%]`}
      style={{ top: `${props.top}px` }}
    >
      <div className="flex w-full flex-row overflow-hidden ">
        {props.notification.type.includes("chat") ? (
          <ChatBubbleBottomCenterTextIcon className=" absolute mr-auto h-7 w-7" />
        ) : (
          <BellAlertIcon className="absolute mr-auto h-7 w-7"></BellAlertIcon>
        )}

        <div className="relative top-[-2%] mr-auto w-[80%] text-start">
          <h1 className="text-start text-[1.2em]">{props.notification.from}</h1>
          <p className="text-start text-[1em]">
            {props.notification.type.includes("chat")
              ? "Message: " + props.notification.message
              : "Has sent you a trade"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotificationCard;
