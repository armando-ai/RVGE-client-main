import { useState } from "react";
import { useRouter } from "next/router";
import Typewriter from "src/features/auth/components/TypeWriter";
import {
  LockClosedIcon,
  EnvelopeIcon,
  UserCircleIcon,
  PhoneIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  TrashIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";

import Image from "next/image";
import logo from "public/logo.png";
import { request } from "src/utils";

const Auth = () => {
  const [email, setEmail] = useState<string>("");
  const [signUp, setSignup] = useState<string>("show-sign-in");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const [fname, setFname] = useState<string>("");
  const [lname, setLname] = useState<string>("");
  const [emailSignUp, setEmailSignUp] = useState<string>("");
  const [passwordSignUp, setPasswordSignUp] = useState<string>("");
  const [bio, setBio] = useState<string>("");

  const [Username, setUsername] = useState("");
  const [selectedConsoles, setSelectedConsoles] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [phone, setPhone] = useState<string>("");

  const numberTracks = [1, 2, 3];
  const [currentSignUpPage, setPage] = useState<number>(0);

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

  const signUpUser = {
    firstName: fname,
    lastName: lname,
    email: emailSignUp,
    password: passwordSignUp,
    username: Username,
    phoneNumber: phone
      .replaceAll("(", "")
      .replaceAll(")", "")
      .replaceAll("-", "")
      .replaceAll(" ", ""),
    bio,
    platforms: selectedConsoles,
  };
  const loginUser = {
    email,
    password,
  };
  const filteredConsoles = consoles.filter(
    (console) =>
      !selectedConsoles.includes(console) &&
      console.toLowerCase().includes(inputValue.toLowerCase())
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setShowDropdown(true);
    if (e.target.value === "") {
      setShowDropdown(false);
    }
  };

  const handleSelect = (console: string) => {
    setSelectedConsoles([...selectedConsoles, console]);
    setInputValue("");
    setShowDropdown(false);
  };

  const handleRemove = (console: string) => {
    setSelectedConsoles(selectedConsoles.filter((c) => c !== console));
  };
  const handleInput = (event: { target: { value: any } }) => {
    const input = event.target.value;
    const formattedInput = input.replace(/[^\d]/g, "");
    let formattedValue = "";

    if (formattedInput.length >= 10) {
      formattedValue =
        "(" +
        formattedInput.substring(0, 3) +
        ") " +
        formattedInput.substring(3, 6) +
        "-" +
        formattedInput.substring(6);
    } else if (formattedInput.length > 6) {
      formattedValue =
        "(" +
        formattedInput.substring(0, 3) +
        ") " +
        formattedInput.substring(3, 6) +
        "-" +
        formattedInput.substring(6);
    } else if (formattedInput.length > 3) {
      formattedValue =
        "(" +
        formattedInput.substring(0, 3) +
        ") " +
        formattedInput.substring(3);
    } else {
      formattedValue = formattedInput;
    }

    setPhone(formattedValue);
  };

  async function postUser(signUpUser: any) {
    const response = await request<any>(`/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: { user: signUpUser },
    });

    if (response.statusCode === 200) {
      setSignup("show-sign-in");
      setPage(0);
    }
  }
  async function signInUser() {
    const response = await request<any>(`/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: { username: email, password },
    });

    if (response.statusCode === 200) {
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      router.push("/Profile");
    } else {
      window.alert("Invalid Login");
    }
    // .then((data: any) => {
    //   console.log(data);
    //   if (data.statusCode === 200) {
    //     console.log(data.body);
    //     localStorage.setItem("accessToken", data.data.accessToken);
    //     localStorage.setItem("refreshToken", data.data.refreshToken);
    //     window.location.href =
    //       "https://retro-video-game-exchange.vercel.app/Profile";
    //   } else {
    //     window.alert("Account Email/Username is Already in Use");
    //   }
    // })
    // .catch((error) => window.alert(error));
  }
  return (
    <div className="body color2 absolute overflow-y-hidden">
      <div className=" color3 absolute  top-0 h-full w-full"></div>
      <div className=" start-left color2 absolute left-1/2 top-[-37.33%] h-full w-full skew-x-[30deg]"></div>
      <div className=" start-left2 color2 absolute left-[150%] h-full w-1/4"></div>
      <div className="start-left color2 absolute left-1/2 top-[37.5%] h-full w-full skew-x-[-30deg]"></div>
      <div className="content-box z-10">
        <div
          className={`${
            signUp == "show-sign-in" ? "top-[0%]" : "top-[-100%]"
          } content-pane show-sign-in `}
        >
          <h1
            className={`mi-auto mt-[5vh] text-lg font-medium leading-10 tracking-wider`}
          >
            WELCOME TO
          </h1>

          <Image
            priority={true}
            className=" h-[10vh] w-[30vh]"
            alt=""
            src={logo}
          />
          <form
            onSubmit={async (e) => {
              e.preventDefault();
            }}
            className=" flex  w-[100%] flex-col content-center overflow-visible"
          >
            {/* <input name='csrfToken' type='hidden' defaultValue={csrfToken} /> */}
            <div className="input-box mi-auto overflow-visible">
              <UserCircleIcon className="float-left h-8 w-8" />

              <input
                className="input float-left"
                type="text"
                placeholder="Username or Email"
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>
            <div className="input-box mi-auto overflow-visible">
              <LockClosedIcon className="float-left h-8 w-8" />
              <input
                className="input float-left"
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </div>
            <button
              type="submit"
              className="login-button mi-auto rounded-md text-xl"
              onClick={() => {
                signInUser();
              }}
            >
              Login
            </button>
          </form>

          <p className="mt-[3%] font-medium tracking-wide">
            Don't have an account?
            <span
              onClick={() => {
                setSignup("show-sign-up");
                setPage(1);
              }}
              className="cursor-pointer font-semibold tracking-wider text-blue-700"
            >
              {" "}
              Sign Up!
            </span>
          </p>

          <div className="mt-[1%] flex w-full flex-row items-center justify-center">
            <div className="h-[0.5%] w-[18%] bg-slate-900"></div>
            <span className="m-[1%] text-lg">OR</span>
            <div className="h-[0.5%] w-[18%] bg-slate-900"></div>
          </div>

          <p className="mt-[2%] text-gray-600">Continue with social media</p>
          <div className="mt-[3%] flex w-full flex-row items-center justify-center space-x-8"></div>
        </div>
        <div
          className={`${currentSignUpPage === 0 ? "top-[100%]" : ""}
          ${currentSignUpPage === 2 ? "top-[-100%]" : ""}
          ${currentSignUpPage === 3 ? "top-[-100%]" : ""}
          ${signUp !== "show-sign-up" ? "top-[100%]" : ""}
           content-pane absolute top-0 h-full overflow-y-hidden`}
        >
          <div
            id="1"
            className="relative mb-[15%] flex h-[800px] w-full  flex-col  overflow-visible "
          >
            <h1
              className={`mt-[5vh] mr-auto h-auto w-auto bg-slate-400 p-[2.5%] text-center text-4xl font-medium leading-10 tracking-wider text-slate-900 shadow-md shadow-slate-900`}
            >
              Personal Information
            </h1>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
              }}
              className=" mt-[5%] flex  w-[100%] flex-col content-center "
            >
              {/* <input name='csrfToken' type='hidden' defaultValue={csrfToken} /> */}

              <div className="input-box mi-auto t">
                <UserCircleIcon className="float-left h-8 w-8" />

                <input
                  className="input float-left w-[42.5%]"
                  type="text"
                  placeholder="Jane"
                  onChange={(e) => setFname(e.target.value)}
                ></input>
                <input
                  className="input diff float-left  w-[42.5%]"
                  type="text"
                  placeholder="Doe"
                  onChange={(e) => setLname(e.target.value)}
                ></input>
              </div>
              <div className="input-box mi-auto t">
                <EnvelopeIcon className="float-left h-8 w-8" />
                <input
                  className="input float-left"
                  type="text"
                  placeholder="JaneDoe1987@gmail.com"
                  onChange={(e) => setEmailSignUp(e.target.value)}
                ></input>
              </div>
              <div className="input-box mi-auto t">
                <ShieldCheckIcon className="float-left h-8 w-8" />
                <input
                  className="input float-left"
                  type="text"
                  placeholder="XxGamerxX"
                  onChange={(e) => setUsername(e.target.value)}
                ></input>
              </div>
              <div className="input-box mi-auto t">
                <PhoneIcon className="float-left h-8 w-8" />
                <input
                  className="input float-left"
                  type="text"
                  value={phone}
                  placeholder="(123)-456-7890"
                  onChange={handleInput}
                ></input>
              </div>
              <div className="input-box mi-auto">
                <LockClosedIcon className="float-left h-8 w-8" />
                <input
                  className="input float-left"
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPasswordSignUp(e.target.value)}
                ></input>
              </div>
            </form>
          </div>
        </div>
        <div
          className={`${
            signUp == "show-sign-up" && currentSignUpPage === 1
              ? "top-[100%]"
              : ""
          }
          ${signUp !== "show-sign-up" ? "top-[200%]" : ""}
          ${currentSignUpPage === 3 ? "top-[-100%]" : ""}
          ${signUp == "show-sign-up" ? "" : "top-[100%]"}
          content-pane absolute overflow-y-hidden `}
        >
          <div
            id="2"
            className="relative   flex h-[800px] w-full flex-col  overflow-visible pb-[35%]"
          >
            <h1
              className={`mt-[5vh] mr-auto h-auto w-[60%] overflow-visible bg-slate-400 p-[3%]  text-center text-4xl font-medium leading-10 tracking-wider text-slate-900 shadow-md shadow-slate-900`}
            >
              About Me
            </h1>

            <textarea
              onChange={(e) => setBio(e.target.value)}
              placeholder="I am a gamer and have lots of 2008 era...."
              className=" mi-auto mt-[15%]  h-[30vh]  w-[60%] resize-none rounded-md border-2 border-black p-[2%]"
            />
          </div>
        </div>
        <div
          className={`${
            signUp == "show-sign-up" && currentSignUpPage === 3
              ? "top-0 h-full"
              : " top-[100%]"
          } ${
            signUp !== "show-sign-up" ? "top-[300%]" : ""
          } content-pane absolute   overflow-y-hidden `}
        >
          <div
            id="3"
            className="relative  flex h-[800px] w-full flex-col overflow-visible  pb-[35%] "
          >
            <h1
              className={`mt-[5vh] mr-auto w-[60%] overflow-visible bg-slate-400 p-[3%]  text-center text-4xl font-medium leading-10 tracking-wider text-slate-900 shadow-md shadow-slate-900`}
            >
              My Consoles
            </h1>

            <div className="dropdown-container mt-[8%] w-[80%]">
              <div className="selected-container rounded-t-md border-b-0">
                <input
                  value={inputValue}
                  onChange={handleInputChange}
                  placeholder="Type Console(Ex: PS5) Then Select"
                  className="input-field"
                />
                {showDropdown && (
                  <ul className="dropdown-list rounded-b-md ">
                    {filteredConsoles.map((console) => (
                      <li
                        key={console}
                        className=""
                        onClick={() => handleSelect(console)}
                      >
                        {console}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="selected-container rounded-b-md border-t-0">
                {selectedConsoles.map((console) => (
                  <div key={console} className="selected-item text-sm">
                    {console}
                    <TrashIcon
                      onClick={() => handleRemove(console)}
                      className="h-5 w-5 cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            </div>
            <button
              type="button"
              className="login-button mi-auto mb-auto rounded-md text-xl "
              onClick={() => {
                console.log(signUpUser);
                const temp: string[] = [];
                selectedConsoles.forEach((value: string) =>
                  temp.push(value.replaceAll(" ", "_"))
                );
                signUpUser.platforms = temp;
                postUser(signUpUser);
              }}
            >
              Sign Up
            </button>
          </div>
        </div>

        <div className="content-pane color3 move-down relative z-[2] float-right flex flex-col justify-center overflow-hidden">
          <Typewriter strings={consoles} />
        </div>
        <div
          className={`${
            signUp != "show-sign-up" ? "w-0" : "w-[50%]"
          } color4 absolute top-0 right-0 z-[3] flex h-full flex-col content-center self-center overflow-hidden align-middle `}
        >
          <div
            className="mi-auto align-center relative
            z-10 mb-auto w-[10%] content-center justify-center overflow-hidden"
          >
            <ChevronUpIcon
              className="smooth fade cursor-pointer"
              onClick={() => {
                if (currentSignUpPage !== 1) {
                  setPage(currentSignUpPage - 1);
                }
              }}
            />
          </div>

          <div className="relative  flex  flex-row content-center space-x-2 self-center align-middle">
            {numberTracks.map((number) => (
              <>
                {number !== undefined && (
                  <div
                    className={`${
                      currentSignUpPage < number ? "opacity-50" : ""
                    } smooth flex justify-center rounded-full bg-slate-900 py-1.5 px-4 text-2xl text-[#fff]`}
                  >
                    <span key={number} className="mb-[0.15rem]">
                      {number}
                    </span>
                  </div>
                )}
                {number !== numberTracks[numberTracks.length - 1] &&
                  number != undefined && (
                    <div
                      className={`${
                        currentSignUpPage <= number ? "opacity-50" : ""
                      } smooth mt-[2vh] h-[.1vh] w-[6vw] bg-slate-900 `}
                    ></div>
                  )}
              </>
            ))}
          </div>

          <p className="relative  mt-[3%] flex justify-center self-center align-middle font-medium tracking-wide">
            Have an account?
            <span
              onClick={() => {
                setSignup("show-sign-in");
                setPage(0);
              }}
              className="cursor-pointer font-semibold tracking-wider text-blue-700"
            >
              {" "}
              Sign In!
            </span>
          </p>
          <div
            className="mi-auto align-center fade
            relative z-10  mt-auto w-[10%] content-center justify-center overflow-hidden"
          >
            <ChevronDownIcon
              className="smooth skewed cursor-pointer"
              onClick={() => {
                if (
                  currentSignUpPage !== numberTracks[numberTracks.length - 1]
                ) {
                  setPage(currentSignUpPage + 1);
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
