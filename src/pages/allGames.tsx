import {
  ArrowsRightLeftIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import Head from "next/head";
import Link from "next/link";
import { platform } from "os";
import React, { useState } from "react";
import { Navigation, UserCircleIcon } from "src/components";
import Popup from "src/components/Popup";
import GameCard from "src/features/GameCard";
import SendTrade from "src/features/SendTrade";
import { useSession } from "src/hooks";
import { getToken, request } from "src/utils";

const Game = (props: any) => {
  const [offers, setOffers] = useState<any>();

  const [popUp, setPopUp] = useState(false);
  const [title, setTitle] = useState<string>("");
  const [popUpTitle, setPopUpTitle] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [platform, setplatform] = useState<string>("");

  function getMatchingOffers() {
    const filteredOffers = offers?.filter((offer: { games: any[] }) => {
      const filteredGames = offer.games.filter((game: any) => {
        const isTitleMatch = game.name
          .toLowerCase()
          .includes(title.toLowerCase());
        const isYearMatch = year ? game.year.includes(year) : true;
        const isPlatformMatch = game.platform
          .toLowerCase()
          .includes(platform.toLowerCase());
        return isTitleMatch && isYearMatch && isPlatformMatch;
      });
      return filteredGames.length > 0;
    });
    return filteredOffers;
  }
  const { data: session } = useSession();
  const getOffers = async () => {
    await getToken();

    const response: any = await request("/offers/all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    console.log(response);

    setOffers(response);
  };
  const [id, setid] = useState("");
  if (offers === undefined) {
    getOffers();
  }
  return (
    <>


          <Head>
            <title>All Games</title>
          </Head>
          <Navigation />
          {offers !== undefined && (
          <div className="content">
            <div className="header flex h-full flex-col items-center justify-center">
              <div className="w-full overflow-hidden">
                <svg
                  className="waves"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  viewBox="0 24 150 28"
                  preserveAspectRatio="none"
                  shape-rendering="auto"
                >
                  <defs>
                    <path
                      id="gentle-wave"
                      d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
                    />
                  </defs>
                  <g className="parallax">
                    <use
                      xlinkHref="#gentle-wave"
                      x="48"
                      y="0"
                      fill="#cccccc5c"
                    />
                    <use
                      xlinkHref="#gentle-wave"
                      x="48"
                      y="3"
                      fill="#cccccc5c"
                    />
                    <use
                      xlinkHref="#gentle-wave"
                      x="48"
                      y="5"
                      fill="#cccccc5c"
                    />
                    <use xlinkHref="#gentle-wave" x="48" y="7" fill="#ccc" />
                  </g>
                </svg>
              </div>

              <div className=" w-full rotate-180 overflow-hidden">
                <svg
                  className="waves"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  viewBox="0 24 150 28"
                  preserveAspectRatio="none"
                  shape-rendering="auto"
                >
                  <defs>
                    <path
                      id="gentle-wave"
                      d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
                    />
                  </defs>
                  <g className="parallax">
                    <use
                      xlinkHref="#gentle-wave"
                      x="48"
                      y="0"
                      fill="#cccccc5c"
                    />
                    <use
                      xlinkHref="#gentle-wave"
                      x="48"
                      y="3"
                      fill="#cccccc5c"
                    />
                    <use
                      xlinkHref="#gentle-wave"
                      x="48"
                      y="5"
                      fill="#cccccc5c"
                    />
                    <use xlinkHref="#gentle-wave" x="48" y="7" fill="#ccc" />
                  </g>
                </svg>
              </div>
            </div>
            <div className="absolute mt-[3%] h-[20%] w-[60%]  ">
              <div className="row1 items-center justify-center rounded-full  p-[1%]">
                <div className="input-box mi-auto t w-full items-center  justify-center rounded-full border-transparent bg-slate-200">
                  <input
                    className="input float-left w-[28%]"
                    type="text"
                    placeholder="Game Name"
                    onChange={(e) => setTitle(e.target.value)}
                  ></input>
                  <input
                    className="input diff float-left  w-[20%]"
                    type="text"
                    placeholder="platform"
                    onChange={(e) => setplatform(e.target.value)}
                  ></input>
                  <input
                    className="input diff float-left  w-[20%]"
                    type="text"
                    placeholder="Year"
                    onChange={(e) => setYear(e.target.value)}
                  ></input>
                  <MagnifyingGlassIcon className=" relative ml-auto mt-[0.5%] flex h-6 w-6"></MagnifyingGlassIcon>
                </div>
                <p className=" flex rounded-none   text-slate-300">
                  Total Offers :{getMatchingOffers().length}
                </p>
              </div>
            </div>
            <div
              id="games"
              className="absolute right-[0.5%] top-[25vh] mr-[2%] flex h-[68vh] w-[80%] flex-row flex-wrap items-center justify-center overflow-y-auto px-[3%] pr-[9%]  align-middle "
            >
              {title === "" && platform === "" && year === ""
                ? offers.map((offer: any) => {
                    return (
                      <div
                        className="mt-10 w-full  rounded-[50px] bg-slate-300 p-[2%] "
                        id={`offer-${offer.id}`}
                      >
                        <h1 className="mt-3 mb-5 flex h-[7vh] flex-row items-center  justify-center overflow-hidden text-4xl font-normal tracking-wide">
                          Offer -
                          <div className="mt-auto h-full w-auto overflow-visible">
                            <button
                              onClick={() => {
                                setid(offer.id);
                                setPopUp(true);
                              }}
                              className="mt-2 w-[6vh] rounded-full bg-slate-400 p-[3%] text-slate-900 hover:text-slate-500  "
                            >
                              <ArrowsRightLeftIcon className="h-10 w-10" />
                            </button>
                          </div>
                          <Link
                            href={{
                              pathname: `/ViewProfile`,
                              query: { user: JSON.stringify(offer.user) },
                            }}
                            className="smooth ml-auto flex cursor-pointer text-2xl font-light hover:border-b-2 hover:border-b-slate-500 hover:text-slate-500"
                          >
                            {offer.user.username}
                          </Link>
                        </h1>{" "}
                        {/* add any other offer information here */}
                        <div className="flex w-full flex-row justify-center space-x-8">
                          {offer.games.map((game: any) => (
                            <div key={game.id}>
                              <GameCard
                                className=" h-[40vh] w-[35vh] overflow-hidden border-none"
                                game={game}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })
                : getMatchingOffers().map((offer: any) => {
                    return (
                      <div
                        className="mt-10 w-full  rounded-[50px] bg-slate-300 p-[1%] "
                        id={`offer-${offer.id}`}
                      >
                        <h1 className="mt-3 mb-5 flex h-[7vh] flex-row items-center justify-center overflow-hidden text-4xl font-semibold tracking-wide">
                          Offer -
                          <div className="mt-auto h-full w-auto overflow-visible">
                            <button
                              onClick={() => {
                                setid(offer.id);
                                setPopUp(true);
                              }}
                              className="mt-2 w-[6vh] rounded-full bg-slate-400 p-[3%] text-slate-900 hover:text-slate-500  "
                            >
                              <ArrowsRightLeftIcon className="h-10 w-10" />
                              <p>{offer.user}</p>
                            </button>
                          </div>
                        </h1>{" "}
                        {/* add any other offer information here */}
                        <div className="flex w-full flex-row justify-center space-x-8">
                          {offer.games.map((game: any) => (
                            <div key={game.id}>
                              <GameCard
                                className=" h-[40vh] w-[35vh] overflow-hidden border-none"
                                game={game}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
            </div>
            <Popup
              title={"Send Trade Offer"}
              isOpen={popUp}
              {...props}
              onClose={() => {
                setPopUp(false);
              }}
              children={[
                <SendTrade
                  setPopUp={setPopUp}
                  session={session}
                  offerId={id}
                ></SendTrade>,
              ]}
            ></Popup>
          </div>)}


    </>
  );
};

export default Game;
