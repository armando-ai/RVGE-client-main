import React, { useState } from "react";
import GameCard from "./GameCard";
import { getToken, request } from "src/utils";
import { ArrowsRightLeftIcon } from "@heroicons/react/24/solid";
import {
  ChatBubbleBottomCenterTextIcon,
  ChatBubbleLeftEllipsisIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";
import io from "socket.io-client";
import Link from "next/link";

const TradeCard = (props: any) => {
  async function createRoom() {
    await getToken();
    const userId = props.user.id;

    let socket = io(`${process.env.NEXT_PUBLIC_WS_URL}`, {
      extraHeaders: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    socket.on("connect", () => {
      console.log("connected", socket);
      socket.emit("joinRooms");
    });

    const data = {
      userId: userId,
    };

    console.log(userId);

    socket.emit("createRoom", data);

    socket.on("createdRoom", (data: any) => {
      console.log("createRoom", data);
      const message = { roomId: data.id, message: "fuck you" };
      socket.emit("message", message);

      // setChatRoom((prev: any) => [
      //   <ChatRoom delRoom={setChatRoom} room={data}></ChatRoom>,
      // ]);
    });

    socket.on("joinedRooms", (data: any) => {
      console.log("joined??? -" + data);
    });
    socket.on("connect_error", (error) => {
      console.error("connect error", error);
    });
    socket.on("messages", async (data: any) => {
      console.log(data);
    });

    socket.on("connect_timeout", () => {
      console.error("connect timeout");
    });
  }

  return (
    <div
      id={props.tradeId}
      className="mi-auto mb-10 flex w-[80%] flex-row rounded-md border-4 border-black py-8 "
    >
      <ArrowsRightLeftIcon className="absolute flex h-3/5 w-3/5  font-thin text-slate-300/80" />
      <div className="z-10 mb-auto flex h-full w-1/2 flex-col p-8">
        {props.out === false ? (
          <h3 className="mb-4 border-b-2 border-slate-300 pb-3 text-center  text-2xl">
            Your Offer:
          </h3>
        ) : (
          <h3 className="mb-4 border-b-2 border-slate-300 pb-3 text-center  text-2xl">
            Your Trade Offer:
          </h3>
        )}
        {props.out === false ? (
          <div className="flex flex-wrap gap-6">
            {props.offer.map((game: any) => (
              <GameCard
                className="h-96 w-80 overflow-hidden border-none"
                game={game}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap gap-6">
            {props.trade.map((game: any) => (
              <GameCard
                className="h-96 w-80 overflow-hidden border-none"
                game={game}
              />
            ))}
          </div>
        )}
      </div>

      <div className="mi-auto relative z-10 h-[50vh] w-1 overflow-visible rounded-full bg-slate-800 ">
        {" "}
      </div>
      <ChatBubbleLeftEllipsisIcon
        onClick={createRoom}
        className=" absolute  top-[5%] z-[100]  w-9 cursor-pointer"
      />
      <Link
        href={{
          pathname: `/ViewProfile`,
          query: { user: JSON.stringify(props.user) },
        }}
        className="smooth absolute top-3 right-[12%] z-10 ml-auto flex cursor-pointer text-2xl font-light hover:border-b-2 hover:border-b-slate-500 hover:text-slate-500"
      >
        From: {props.user.username}
      </Link>

      <div className="z-10 mb-auto flex h-full w-1/2 flex-col p-8">
        <h3 className="mb-4 border-b-2 border-slate-300 pb-3 text-center  text-2xl">
          Trade Offer:
        </h3>
        {props.out === false ? (
          <div className="flex flex-wrap gap-6">
            {props.trade.map((game: any) => (
              <GameCard
                className="h-96 w-80 overflow-hidden border-none"
                game={game}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap gap-6">
            {props.offer.map((game: any) => (
              <GameCard
                className="h-96 w-80 overflow-hidden border-none"
                game={game}
              />
            ))}
          </div>
        )}
      </div>
      <div className="absolute z-50 flex h-full ">
        {props.out === false ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mr-8 h-8 w-8 cursor-pointer text-green-500 "
            viewBox="0 0 20 20"
            fill="currentColor"
            onClick={async () => {
              await getToken();

              props.deleteTrade(props.tradeId);

              await request("/offers/" + props.offerId, {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                  authorization: `Bearer ${localStorage.getItem(
                    "accessToken"
                  )}`,
                },
                body: {
                  trade: {
                    trade: true,
                    tradeId: props.tradeId,
                  },
                },
              });
            }}
          >
            <path
              fillRule="evenodd"
              d="M9 12.586L4.707 8.293a1 1 0 10-1.414 1.414l5 5a1 1 0 001.414 0l9-9a1 1 0 10-1.414-1.414l-8.293 8.293z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="ml-14 h-8 w-8 cursor-pointer text-red-500"
            onClick={async () => {
              await getToken();

              props.deleteTrade(props.tradeId);

              await request("/trades/" + props.tradeId, {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                  authorization: `Bearer ${localStorage.getItem(
                    "accessToken"
                  )}`,
                },
              });
            }}
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
        )}
        {props.out === false && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="ml-8 h-8 w-8 cursor-pointer text-red-500"
            onClick={async () => {
              await getToken();

              props.deleteTrade(props.tradeId);

              await request("/trades/" + props.tradeId, {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                  authorization: `Bearer ${localStorage.getItem(
                    "accessToken"
                  )}`,
                },
              });
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

export default TradeCard;
