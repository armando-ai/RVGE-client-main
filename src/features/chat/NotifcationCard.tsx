import React from "react";

const NotificationCard = (props: any) => {
  return (
    <div
      className={`${props.className} fixed top-5 h-[10%] w-[24%] flex-col content-start justify-start rounded-md bg-slate-400`}
    >
      <h1 className="mr-auto">{props.notification.from}</h1>
      <p className="mr-auto  text-xs">
        {props.notification.type.includes("chat")
          ? props.notification.message
          : "Has sent you a trade"}
      </p>
    </div>
  );
};

export default NotificationCard;
