import Head from "next/head";
import React, { Component, useState } from "react";
import { Navigation } from "src/components";
import Image from "next/image";
import icon from "public/UserIcon.png";
import Popup from "src/components/Popup";
import { number } from "zod";
import { ArrowPathIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import EditGames from "src/features/EditGames";
import EditConsoles from "src/features/EditConsoles";
import EditAccount from "src/features/EditAccount";
import EditOffers from "src/features/EditOffers";
import { useSession } from "src/hooks";
import PopUpTwo from "./PopUp2";
import { getToken, request } from "src/utils";
export const Profile = (props: any) => {
  const { data: session } = useSession();

  const [email, setEmail] = useState<string>("");
  const [index, setIndex] = useState<number>(0);

  const [popUp, setPopUp] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [bio, setBio] = useState<boolean>(false);

  function deleteGame(game: any) {
    user.games.splice(
      user.games.findIndex((value: any) => value === game),
      1
    );

    setUser(user);
  }

  function updatePopUp(index: number, title: string) {
    setPopUp(!popUp);
    setPopUpContent(index, title);
  }
  function addGame(game: any) {
    //send
    user.games.push(game);
    setUser(user);
    console.log(user.games);
  }
  function setPopUpContent(state: number, title: string) {
    setTitle(title);
    setIndex(state);
  }
  const newGame = useState({});
  const [user, setUser] = useState<any>();
  const [forms, setForms] = useState<any>([]);
  if (user === undefined && session !== undefined) {
    setUser(session);

    console.log(session);
  } else if (
    session !== undefined &&
    user !== undefined &&
    forms.length === 0
  ) {
    setForms([
      <EditGames
        key="1"
        addGame={addGame}
        deleteGame={deleteGame}
        userGames={user?.games}
        setPopUp={setPopUp}
      ></EditGames>,
      <EditConsoles
        key="2"
        user={user}
        setUser={setUser}
        setPopUp={setPopUp}
      ></EditConsoles>,
      <EditAccount
        key="3"
        user={user}
        setUser={setUser}
        setPopUp={setPopUp}
      ></EditAccount>,
      <EditOffers
        key="4"
        user={user}
        setUser={setUser}
        setPopUp={setPopUp}
      ></EditOffers>,
    ]);
  }
  

  return (
    <>
      {user !== undefined && (
        <>
          <Head>
            <title>My Profile</title>
            <meta
              name="description"
              content="Game Trading to a digital level"
            />
          </Head>
          <Navigation />
          <div className="content">
            <div className="header">
              <div className="inner-header flex"></div>

              <div className="overflow-hidden">
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
            <div className="userDesc">
              <Image
                priority={true}
                width={100}
                height={100}
                alt=""
                src={icon}
              />
              <h1>{user.username}</h1>

              <div className="ml-auto flex w-40 justify-end rounded-md border-2 border-slate-900">
                {user?.admin == false && (
                  <h1
                    className="cursor-pointer   p-[2px] font-[200!important] "
                    onClick={() => {
                      updatePopUp(2, "Edit Account Information");
                    }}
                  >
                    Edit Account
                  </h1>
                )}
                {user?.admin == true && (
                  <h1
                    className="cursor-pointer p-[2px] font-[200!important] "
                    onClick={() => {
                      updatePopUp(2, "Edit Account Information");
                    }}
                  >
                    Delete User
                  </h1>
                )}
              </div>
            </div>
            <div className="bio overflow-hidden">
              {bio === false ? (
                <p>{user?.bio}</p>
              ) : (
                <div className="flex h-[38vh] w-[99%] flex-col overflow-hidden">
                  <textarea
                    onChange={(e) => {
                      user.bio = e.target.value;
                      setUser(user);
                    }}
                    className=" mi-auto h-full w-full resize-none rounded-md  p-[1%] text-lg leading-tight text-slate-900 active:border-0"
                  >
                    {user?.bio}
                  </textarea>
                  <ArrowPathIcon
                    className="ml-auto mt-[1%] h-5 w-5 cursor-pointer"
                    onClick={() => {
                      setBio(false);
                      getToken();
                      request("/users", {
                        method: "PATCH",
                        headers: {
                          "Content-Type": "application/json",
                          authorization: `Bearer ${localStorage.getItem(
                            "accessToken"
                          )}`,
                        },
                        body: {
                          bio: user.bio,
                        },
                      });
                      //edit bio post here
                    }}
                  ></ArrowPathIcon>
                </div>
              )}
            </div>
            {bio === false && user?.admin == false && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                onClick={() => {
                  setBio(true);
                }}
                fill="#f5f5f5"
                className="editbio h-6 w-6"
              >
                <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
              </svg>
            )}

            <div className="row over mt-auto">
              <div className="rowbox">
                <h2 className="overflow-hidden">Games: {user?.games.length}</h2>
                {user?.admin == false && (
                  <svg
                    onClick={() => {
                      updatePopUp(0, "Edit Game Collection");
                    }}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="#f5f5f5"
                    className="add h-6 w-6"
                  >
                    <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                    <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
                  </svg>
                )}
              </div>

              <div className="rowbox">
                <h2 className="overflow-hidden">
                  Platforms: {user?.platforms.length}
                </h2>
                {user?.admin == false && (
                  <svg
                    onClick={() => {
                      updatePopUp(1, "Edit Platform Collection");
                    }}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="#f5f5f5"
                    className="add h-6 w-6"
                  >
                    <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                    <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
                  </svg>
                )}
              </div>

              <div className="rowbox">
                <h2>Offers: {user?.offers.length}</h2>
                {user?.admin == false && (
                  <svg
                    onClick={() => {
                      updatePopUp(3, "Edit Offers");
                    }}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="#f5f5f5"
                    className="add h-6 w-6"
                  >
                    <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                    <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
                  </svg>
                )}
              </div>
              <Popup
                title={title}
                isOpen={popUp}
                {...props}
                onClose={() => {
                  setPopUp(false);
                }}
                children={forms[index]}
              ></Popup>
              {/* <PopUpTwo
                title={title}
                isOpen={true}
                {...props}
                onClose={() => {
                  setPopUp(false);
                }}

              ></PopUpTwo> */}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Profile;
