import React from "react";

const UserChat = (props: any) => {
  return (
    <div
      className={`${props.className} ml-auto flex h-auto w-[70%] flex-row items-start justify-start self-end overflow-hidden `}
    >
      <div className="relative mx-2 mb-[4px] ml-auto flex h-full flex-col rounded-lg bg-slate-700 p-[4%] text-left text-sm leading-5 text-white">
        <p className="text-left">{props.message}</p>
      </div>
    </div>
  );
};

export default UserChat;
