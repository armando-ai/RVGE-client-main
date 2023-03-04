import { UserCircleIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { boolean } from "zod";
import GameCard from "./GameCard";
import { getToken, request } from "src/utils";

const EditGames = (props: any) => {
  const [state, setState] = useState<string>("add");
  const [name, setName] = useState<string>("");
  const [platform, setPlatform] = useState<string>("");
  const [publisher, setPublisher] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [condition, setCondition] = useState<string>("");
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  function deleteGame(game: any) {
    document.getElementById("game-" + game.id)?.remove();
    //send del request for this game here
    props.deleteGame(game);
  }

  const consoles = [
    "Atari 2600",
    "Atari 5200",
    "Atari 7800",
    "Atari Jaguar",
    "Atari Lynx",
    "ColecoVision",
    "Commodore 64",
    "Game Boy",
    "Game Boy Advance",
    "Game Boy Color",
    "GameCube",
    "Intellivision",
    "Magnavox Odyssey",
    "Microsoft Xbox",
    "Microsoft Xbox 360",
    "Microsoft Xbox One",
    "Neo Geo AES",
    "Neo Geo CD",
    "Neo Geo MVS",
    "Nintendo 3DS",
    "Nintendo 64",
    "Nintendo DS",
    "Nintendo Entertainment System",
    "Nintendo GameCube",
    "Nintendo Switch",
    "Nintendo Wii",
    "Nintendo Wii U",
    "PC",
    "PlayStation",
    "PlayStation 2",
    "PlayStation 3",
    "PlayStation 4",
    "PlayStation 5",
    "PlayStation Portable",
    "PlayStation Vita",
    "Sega Dreamcast",
    "Sega Game Gear",
    "Sega Genesis",
    "Sega Master System",
    "Sega Saturn",
    "Super Nintendo Entertainment System",
    "TurboGrafx-16",
    "Xbox 360",
  ];

  const filteredConsoles = consoles.filter((console) =>
    console.toLowerCase().includes(platform.toLowerCase())
  );

  const handleSelect = (console: string) => {
    setPlatform(console);
    setShowDropdown(false);
  };

  const resetInputs = () => {
    setName("");
    setPlatform("");
    setPublisher("");
    setYear("");
    setCondition("");
  };

  return (
    <div className="flex h-full w-full flex-col">
      <div className="  flex h-[1%] w-[70%] flex-row overflow-hidden rounded-full p-[20px] pt-[25px] pb-[25px]">
        <div
          onClick={() => {
            setState("add");
          }}
          className={`${
            state === "add" &&
            "cursor-pointer  bg-slate-900 text-[white!important]"
          }  ml-auto mr-[1%] flex w-1/2 cursor-pointer items-center justify-center overflow-hidden rounded-full p-[2%] align-middle`}
        >
          <p
            className={`${
              state === "add" && " text-[white!important]"
            }  text-xl`}
          >
            Add Game
          </p>
        </div>
        <div
          onClick={() => {
            setState("remove");
          }}
          className={`${
            state === "remove" && "bg-slate-900 text-[white!important]"
          }  ml-auto  flex w-1/2 cursor-pointer items-center overflow-hidden rounded-full p-[2%] align-middle`}
        >
          <p
            className={`${
              state === "remove" && " text-[white!important]"
            }  text-xl`}
          >
            Delete Current Games
          </p>
        </div>
      </div>
      {state === "add" && (
        <form
          onMouseLeave={() => {
            setShowDropdown(false);
          }}
          className="relative top-[-3.5vh] flex h-auto w-[70%] flex-col"
        >
          <div className="input-box smooth mi-auto mb-auto h-[5vh] items-center overflow-visible p-0">
            <input
              className="input float-left mt-0 mb-[1px] "
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></input>
          </div>
          <div className="input-box smooth mi-auto mb-auto h-[5vh] items-center overflow-visible p-0">
            <input
              className="input float-left mt-0 mb-[1px] "
              type="text"
              placeholder="Platform"
              value={platform}
              onChange={(e) => {
                setPlatform(e.target.value);
                setShowDropdown(true);
              }}
            ></input>
            {showDropdown && (
              <ul className="dropdown-list rounded-b-md text-lg">
                {filteredConsoles.map((console) => (
                  <li key={console} onClick={() => handleSelect(console)}>
                    {console}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="input-box smooth mi-auto mb-auto h-[5vh] items-center overflow-visible p-0">
            <input
              className="input float-left mt-0 mb-[1px] "
              type="text"
              placeholder="Publisher"
              value={publisher}
              onChange={(e) => setPublisher(e.target.value)}
            ></input>
          </div>
          <div className="input-box smooth mi-auto mb-auto h-[5vh] items-center overflow-visible p-0">
            <input
              className="input float-left mt-0 mb-[1px] "
              type="number"
              placeholder="Year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            ></input>
          </div>
          <div className="row mb-auto mt-3 h-[15%] w-[80%] items-center justify-center">
            <input
              className="mr-[0.5%] h-[20px] w-[20px] "
              name="group1"
              type="radio"
              checked={condition === "new"}
              onChange={() => {
                setCondition("new");
              }}
            ></input>
            <p className="text-xl"> New</p>
            <input
              className=" ml-[2%]  mr-[1%] h-[20px] w-[20px]"
              name="group1"
              checked={condition === "used"}
              onChange={() => {
                setCondition("used");
              }}
              type="radio"
            ></input>
            <p className="text-xl"> Used</p>
          </div>
          <input className="mt-3" type="file"></input>
          <button
            className="login-button mi-auto   h-[5vh]  overflow-hidden rounded-md"
            onClick={async (e) => {
              e.preventDefault();
              await getToken();

              props.addGame({
                name,
                platform: platform.replaceAll(" ", "_"),
                publisher,
                condition,
                year,
              });
              request("/games", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  authorization: `Bearer ${localStorage.getItem(
                    "accessToken"
                  )}`,
                },
                body: {
                  game: {
                    name,
                    platform: platform.replaceAll(" ", "_"),
                    publisher,
                    condition,
                    year,
                  },
                },
              });
              resetInputs();
            }}
          >
            Add Game
          </button>
        </form>
      )}
      {state === "remove" && (
        <div className=" ] flex h-[50vh] w-[100%] flex-row flex-wrap items-start justify-start  align-top ">
          {props.userGames.map((game: any) => {
            return (
              <GameCard
                className=" ml-[1%] mr-[1%] mt-3 h-[47vh] w-[40%] overflow-hidden"
                deleteGame={deleteGame}
                profile={true}
                game={game}
              ></GameCard>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default EditGames;
