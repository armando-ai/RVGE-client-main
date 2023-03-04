import React, { useState } from "react";
import Image from "next/image";
import icon from "public/UserIcon.png";
const RoomCard = (props: any) => {
  const [del, setDel] = useState(false);
  function checkDateString(dateString: string) {
    const inputDate = new Date(dateString);

    // Check if inputDate is today's date
    const today = new Date();
    if (
      inputDate.getDate() === today.getDate() &&
      inputDate.getMonth() === today.getMonth() &&
      inputDate.getFullYear() === today.getFullYear()
    ) {
      // Return timestamp with AM/PM
      const hours = inputDate.getHours() % 12 || 12;
      const minutes = inputDate.getMinutes().toString().padStart(2, "0");
      const amPm = inputDate.getHours() < 12 ? "AM" : "PM";
      return `${hours}:${minutes} ${amPm}`;
    } else {
      // Return month and day
      const month = inputDate.toLocaleString("default", { month: "short" });
      const day = inputDate.getDate();
      return `${month} ${day}`;
    }
  }
  function delChat(id: string) {
    const parent = document.getElementById("card");
    const child = document.getElementById(id);
    console.log(parent);
    console.log(child);
    if (child !== null && parent?.contains(child)) {
      parent?.removeChild(child);
    }
  }
  return (
    <div id="card">
      <div
        id={`${props.chat.id}`}
        onMouseOver={() => {
          setDel(true);
        }}
        onMouseLeave={() => {
          setDel(false);
        }}
        className="smooth flex h-auto w-full cursor-pointer flex-row border-b-2 border-slate-500 p-[1%] hover:bg-slate-400 "
      >
        <Image
          className=" mr-1 rounded-full"
          priority={true}
          width={50}
          height={50}
          alt=""
          src={icon}
        />
        <div className="mr-auto flex flex-col ">
          <h1 className="mr-auto">{props.chat.from}</h1>
          <p className="mr-auto text-xs">{props.chat.lastMessage.message}</p>
        </div>
        {del === false ? (
          <p className="m-1 mb-auto text-sm">
            {checkDateString(props.chat.lastMessage.createdAt)}
          </p>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="ml-14 h-8 w-8 cursor-pointer text-red-500 hover:animate-bounce"
            onClick={async () => {
              delChat(props.chat.id);
              console.log(props.chat.id);
              //   await getToken();
              //   props.deleteTrade(props.tradeId);
              //   await request("/trades/" + props.tradeId, {
              //     method: "DELETE",
              //     headers: {
              //       "Content-Type": "application/json",
              //       authorization: `Bearer ${localStorage.getItem(
              //         "accessToken"
              //       )}`,
              //     },
              //   });
            }}
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
        )}
      </div>
    </div>
  );
};

export default RoomCard;
