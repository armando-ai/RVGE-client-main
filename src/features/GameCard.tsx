import React from "react";
import PropTypes from "prop-types";
import { ArrowsRightLeftIcon, TrashIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import game from "../../public/gameicon.png";
import { getToken, request } from "src/utils";

const GameCard = (props: any) => {
  return (
    <div
      id={`game-${props.game.id}`}
      className={`${props.className} mi-auto mb-6 flex w-1/2 items-center rounded-md border-[4px] bg-transparent p-4 align-top`}
    >
      <div className="flex-1">
        {props.offer === true && (
          <TrashIcon
            onClick={() => props.handleRemove(props.game)}
            className="mi-auto h-10 w-10 cursor-pointer "
          />
        )}
        <Image className="mi-auto mb-10 h-1/2 w-1/2" src={game} alt={""} />
        <p className="text-xl font-normal ">{props.game.name}</p>
        <p className="text-lg font-normal ">
          {props.game.platform.replaceAll("_", " ")} - {props.game.year}
        </p>
      </div>

      {props.profile === true && (
        <div className="flex-none">
          <button
            onClick={(e) => {
              e.preventDefault();
              getToken();
              props?.deleteGame(props.game);
              request("/games/" + props.game.id, {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                  authorization: `Bearer ${localStorage.getItem(
                    "accessToken"
                  )}`,
                },
              });
            }}
            className=" hover:text-slate-500"
          >
            <TrashIcon className="h-10 w-10" />
          </button>
        </div>
      )}
    </div>
  );
};

export default GameCard;
