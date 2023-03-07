import { BellAlertIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import React from "react";
import { getToken, request } from "src/utils";

const NotificationCard = (props: any) => {
  const router = useRouter();
  const createCurrentRoom = async () => {
    await getToken();
    const data = await request("/getroom/" + props.chat.id, {
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
    <div
      onClick={() => {
        props.notification.type.includes("chat")
          ? createCurrentRoom()
          : () => {
              router.push("/rtrades");
            };
      }}
      className={`${props.className} fixed top-5 h-[10%] w-[24%] flex-col content-start justify-start rounded-md bg-slate-400 p-[1%]`}
    >
      <div className="flex-row flex w-full p-[1%]">
        <BellAlertIcon className="mr-auto h-7 w-7"></BellAlertIcon>
        <div className="ml-auto h-full w-[80%] flex-col">
          <h1 className="mr-auto">{props.notification.from}</h1>
          <p className="mr-auto  text-xs">
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
