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
  return (
    <>
      {props.notification !== "" && (
        <div
          onClick={() => {
            props.notification.type.includes("chat")
              ? createCurrentRoom()
              : () => {
                  router.push("/rtrades");
                };
          }}
          className={`${props.className} absolute top-5  z-[9999] h-[10%] w-[24%] cursor-pointer flex-col content-start justify-start overflow-hidden rounded-md bg-slate-400 p-[1%]`}
        >
          <div className="flex-row flex w-full overflow-hidden p-[1%]">
            {props.notification.type.includes("chat") ? (
              <ChatBubbleBottomCenterTextIcon className="mr-auto h-7 w-7" />
            ) : (
              <BellAlertIcon className="mr-auto h-7 w-7"></BellAlertIcon>
            )}

            <div className="ml-auto h-full  w-[80%] text-start">
              <h1 className="text-start">{props.notification.from}</h1>
              <p className="text-start text-xs">
                {props.notification.type.includes("chat")
                  ? "Message: " + props.notification.message
                  : "Has sent you a trade"}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NotificationCard;
