import { TrashIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { boolean } from "zod";
import GameCard from "./GameCard";
import { getToken, request } from "src/utils";
import { useSession } from "src/hooks";

const EditOffers = (props: any) => {
  const [state, setState] = useState<string>("add");
  const [selectedConsoles, setSelectedConsoles] = useState<any>([]);
  function deleteOffer(id: any) {
    document.getElementById("offer-" + id)?.remove();
    //send del request for this offer here
  }

  const [inputValue, setInputValue] = useState<string>("");
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const consoles = props.user.games;

  const filteredConsoles = consoles.filter(
    (console: any) =>
      !selectedConsoles.includes(console) &&
      console.name.toLowerCase().includes(inputValue.toLowerCase())
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setShowDropdown(true);
    if (e.target.value === "") {
      setShowDropdown(false);
    }
  };

  const handleSelect = (console: any) => {
    setSelectedConsoles([...selectedConsoles, console]);
    setInputValue("");
    setShowDropdown(false);
  };

  const handleRemove = (console: any) => {
    setSelectedConsoles(
      selectedConsoles.filter((c: any) => c.name !== console.name)
    );
  };

  return (
    <div className="relative top-[-5.85vh] flex h-full w-full scale-90 flex-col overflow-hidden bg-[#f5f5f5]">
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
            Create Offer
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
            Delete Current Offers
          </p>
        </div>
      </div>
      {state === "add" && (
        <div className="flex h-full w-full flex-col  items-center ">
          <div className="dropdown-container relative top-[5%] mt-0 ">
            <div className="selected-container  rounded-md  ">
              <input
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Search Your Game Collection"
                className="input-field "
              />
              {showDropdown && (
                <ul className="dropdown-list top-[14%] rounded-b-md ">
                  {filteredConsoles.map((console: any) => (
                    <li key={console} onClick={() => handleSelect(console)}>
                      {console.name} - {console.platform.replaceAll("_", " ")} -{" "}
                      {console.year}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="relative  left-[-45%] flex h-[45vh] w-[80vw] flex-row items-start justify-items-start   ">
              {selectedConsoles.map((console: any) => (
                <GameCard
                  className="mt-3  mr-3 ml-0 h-[40vh] w-[18vw] overflow-hidden border-none "
                  profile={false}
                  offer={true}
                  handleRemove={handleRemove}
                  game={console}
                ></GameCard>
              ))}
            </div>
          </div>
          <button
            type="button"
            className="login-button mi-auto mt-auto h-auto rounded-md  "
            onClick={async () => {
              await getToken();

              const newOffer: any = await request("/offers", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  authorization: `Bearer ${localStorage.getItem(
                    "accessToken"
                  )}`,
                },
                body: {
                  offer: {
                    games: selectedConsoles.map((obj: { id: any }) => obj.id),
                  },
                },
              });
              props.user.offers.push(newOffer.data.offer);
              newOffer.data.offer.games.map(
                (game: any) =>
                  (props.user.games = props.user.games.filter(
                    (c: any) => c.id !== game.id
                  ))
              );
              props.setUser(props.user);

              setSelectedConsoles([]);
              setInputValue("");
            }}
          >
            Create Offer
          </button>
        </div>
      )}
      {state === "remove" && (
        <div className="relative  flex h-[60vh] w-full flex-col overflow-scroll   align-middle">
          <div className=" w-[80%]">
            {props.user.offers.map((offer: any) => {
              console.log(offer);
              return (
                <div
                  className="mt-10   rounded-[50px] bg-slate-300 p-[1%] "
                  id={`offer-${offer.id}`}
                >
                  <h1 className="mt-3 mb-5 flex h-[7vh] flex-row items-center justify-center overflow-hidden text-4xl font-semibold tracking-wide">
                    Offer - {offer.id}
                    <TrashIcon
                      onClick={async () => {
                        deleteOffer(offer.id);
                        await getToken();

                        await request("/offers/" + offer.id, {
                          method: "DELETE",
                          headers: {
                            "Content-Type": "application/json",
                            authorization: `Bearer ${localStorage.getItem(
                              "accessToken"
                            )}`,
                          },
                        });
                        props.user.offers = props.user.offers.filter(
                          (c: any) => c.id !== offer.id
                        );
                        offer.games.map(
                          (game: any) =>
                            (
                              props.user.games.push(game)
                            )
                        );

                        props.setUser(props.user);
                      }}
                      className="ml-10 h-10 w-10 cursor-pointer text-black"
                    />
                  </h1>{" "}
                  {/* add any other offer information here */}
                  <div className="flex w-full flex-row justify-center space-x-8">
                    {offer.games.map((game: any) => (
                      <div key={game.id}>
                        <GameCard
                          className=" h-[30vh] w-[25vh] overflow-hidden border-none"
                          game={game}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default EditOffers;
