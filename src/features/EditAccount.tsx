import {
  UserCircleIcon,
  LockClosedIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { getToken, request } from "src/utils";

const EditAccount = (props: any) => {
  const [name, setName] = useState<string>(props.user.name);
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [email, setEmail] = useState<string>(props.user.email);
  const [username, setUsername] = useState(props.user.username);
  const rawEmail = props.user.email;
  async function checkValues() {
    await getToken();
    const apiCall = true;
    const data: any = await request("/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: rawEmail, oldPassword }),
    });

    //if true updates otherwise return false

    if (data.statusCode === 200) {
      // console.log(data);
      // props.user.username = username;
      // props.user.name = name;
      // props.user.email = email;
      await getToken();
      await request("/users", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: {
          firstName: name.split(" ")[0],
          lastName: name.split(" ")[1],
          email: email,
          username: username,
          password: newPassword,
        },
      });
      // window.alert("All Fields Updated Successfully");
    } else {
      props.user.username = username;
      props.user.name = name;
      props.user.email = email;
      await getToken();
      await fetch(process.env.NEXT_PUBLIC_API_URL + "/users", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({
          firstName: name.split(" ")[0],
          lastName: name.split(" ")[1],
          email: email.toLowerCase(),
          username: username,
        }),
      });
    }
    props.setPopUp(false);
    window.alert("Values Updated");
  }

  return (
    <div className="relative top-[-5vh] flex h-full w-[90%] scale-90 flex-col self-center ">
      <div className="input-box mi-auto mt-5 h-[auto!important] ">
        <UserCircleIcon className="float-left h-8 w-8" />
        <input
          className="input float-left  "
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        ></input>
      </div>
      <div className="input-box mi-auto mt-5 h-[auto!important] ">
        <UserCircleIcon className="float-left h-8 w-8" />
        <input
          className="input float-left  "
          type="text"
          placeholder="Name"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        ></input>
      </div>
      <div className="input-box mi-auto overflow-visible">
        <EnvelopeIcon className="float-left h-8 w-8"></EnvelopeIcon>
        <input
          className="input float-left  "
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
      </div>
      <div className="input-box mi-auto overflow-visible">
        <LockClosedIcon className="float-left h-8 w-8" />
        <input
          className="input float-left  "
          type="password"
          placeholder="Old Password"
          onChange={(e) => setOldPassword(e.target.value)}
        ></input>
      </div>
      <div className="input-box mi-auto overflow-visible">
        <LockClosedIcon className="float-left h-8 w-8" />
        <input
          className="input float-left  "
          type="password"
          placeholder="New Password"
          onChange={(e) => setNewPassword(e.target.value)}
        ></input>
      </div>
      <button
        className="login-button h-auto "
        onClick={(e) => {
          e.stopPropagation();

          e.preventDefault();
          checkValues();
        }}
      >
        Save
      </button>
    </div>
  );
};

export default EditAccount;
