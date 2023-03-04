import React from "react";

const OtherChat = (props: any) => {
  return (
    <div className="mr-auto flex h-auto w-[70%] flex-row items-start justify-start self-end  overflow-hidden">
      <div className="relative mx-2 my-2 mr-auto flex h-full max-w-xs flex-col rounded-lg bg-white py-2 px-4 text-sm leading-5 text-black">
        {props.message}
      </div>
    </div>
  );
};

export default OtherChat;
