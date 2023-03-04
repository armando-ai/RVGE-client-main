import Head from "next/head";
import React, { Component, useState } from "react";
import { Navigation } from "src/components";
import Image from "next/image";
import icon from "public/UserIcon.png";
import Popup from "src/components/Popup";

import { number } from "zod";
import { ArrowPathIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { decode } from "querystring";
import { useSession } from "src/hooks";
export const ViewProfile = (props: any) => {
  const router = useRouter();
  const { user } = router.query;
  const getUser = () => {
    if (user) {
      return JSON.parse(user + "");
    }
    return "";
  };
  const [signUpUser, setUser] = useState<any>(getUser());
  const [rawUser, setRawUser] = useState<any>();
  const { data: session } = useSession();
  if (rawUser === undefined && session !== undefined) {
    setRawUser(session);
  }
  const [email, setEmail] = useState<string>("");
  const [index, setIndex] = useState<number>(0);
  const forms = [];
  const [popUp, setPopUp] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [bio, setBio] = useState<boolean>(false);

  function updatePopUp(index: number, title: string) {
    setPopUp(!popUp);
    setPopUpContent(index, title);
  }
  function addGame(game: any) {
    //send
    signUpUser.library.push(game);
    setUser(signUpUser);
    console.log(signUpUser.library);
  }
  function setPopUpContent(state: number, title: string) {
    setTitle(title);
    setIndex(state);
  }
  const newGame = useState({});
  return (
    <>
      <Head>
        <title>My Profile</title>
        <meta name="description" content="Game Trading to a digital level" />
      </Head>
      <Navigation />
      {user !== undefined && (
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
                  <use xlinkHref="#gentle-wave" x="48" y="0" fill="#cccccc5c" />
                  <use xlinkHref="#gentle-wave" x="48" y="3" fill="#cccccc5c" />
                  <use xlinkHref="#gentle-wave" x="48" y="5" fill="#cccccc5c" />
                  <use xlinkHref="#gentle-wave" x="48" y="7" fill="#ccc" />
                </g>
              </svg>
            </div>
          </div>
          <div className="userDesc">
            <Image priority={true} width={100} height={100} alt="" src={icon} />
            <h1>{signUpUser.username}</h1>

            {rawUser?.admin == true && (
              <div className="ml-auto flex w-40 justify-end rounded-md border-2 border-slate-900">
                <h1
                  className="cursor-pointer p-[2px] font-[200!important] "
                  onClick={() => {
                    updatePopUp(2, "Edit Account Information");
                  }}
                >
                  Delete User
                </h1>
              </div>
            )}
          </div>
          <div className="bio overflow-hidden">
            <p>{signUpUser.bio}</p>
          </div>

          <div className="row over mt-auto">
            <div className="rowbox">
              <h2 className="overflow-hidden">
                Games: {signUpUser.library.length}
              </h2>
            </div>

            <div className="rowbox">
              <h2 className="overflow-hidden">
                Platforms: {signUpUser.platforms.length}
              </h2>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewProfile;
