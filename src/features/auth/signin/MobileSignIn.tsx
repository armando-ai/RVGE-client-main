import React, { useState } from "react";
import { GoogleButton, Input } from "../components";
import { isBlank } from "../functions";
import { useRouter } from "next/router";
import { login } from "../functions";
import { useGoogleLogin } from "@react-oauth/google";
import { loginWithGoogle } from "../functions/login.with.google";

type Props = {
  isSignIn: boolean;
  setIsSignIn: CallableFunction;
};

export const MobileSignIn = ({ isSignIn, setIsSignIn }: Props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleLogin = async () => {
    if (!isBlank(username, password)) {
      setError("Please fill out all fields");
      return;
    }

    const response = await login({ email: username, password });

    console.log(response);

    if (response.error && response.status !== 200) {
      setError(response.error);
      return;
    }

    if (response.status === 200) {
      localStorage.setItem("accessToken", response.accessToken);
      localStorage.setItem("refreshToken", response.refreshToken);
      return router.push("/");
    }
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: (response) => loginWithGoogle(response),
  });

  const Login = useGoogleLogin({
    onSuccess: (tokenResponse) => console.log(tokenResponse),
  });

  return (
    <div
      className="relative mx-8 flex w-full flex-col
      items-center justify-center space-y-4 rounded bg-slate-200/80 px-8 py-4 shadow-xl
      shadow-slate-500 sm:mx-24"
    >
      <h1 className="py-2 text-4xl">Pipeline</h1>
      <Input
        type="text"
        onChange={setUsername}
        value={username}
        label="Username"
        className="border-b-2 border-slate-900
          bg-transparent px-1 outline-none"
      />
      <Input
        type="password"
        onChange={setPassword}
        value={password}
        label="Password"
        className="border-b-2 border-slate-900
          bg-transparent px-1 outline-none"
      />
      <button
        onClick={handleLogin}
        className="w-full rounded bg-slate-900 py-2
        font-medium tracking-wide text-white/90"
      >
        Sign In
      </button>

      <div className="flex flex-col items-center justify-center space-y-2">
        <p
          onClick={() => setIsSignIn((prev: boolean) => !prev)}
          className="flex cursor-pointer items-center gap-2"
        >
          Don't have an account?
          <span className="py-0.5 font-medium text-blue-700/90">Sign Up!</span>
        </p>
        <p className="relative cursor-pointer text-sm text-gray-600">
          Forgot Password?
        </p>
      </div>
      <div className="flex w-full flex-row items-center justify-center gap-4">
        <div className="h-[2px] w-[30%] rounded-full bg-gray-500/50" />
        OR
        <div className="h-[2px] w-[30%] rounded-full bg-gray-500/50" />
      </div>
      <p>Connect with social media</p>
      <div className="flex justify-center">
        <GoogleButton
          className={{ svg: "h-5 w-5" }}
          onClick={() => handleGoogleLogin()}
        />
      </div>
    </div>
  );
};
{
  /* <FacebookLogin
      appId={`${process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID}`}
      autoLoad={false}
      fields="name,email,picture"
      onClick={() => console.log('clicked')}
      callback={(response: any) => loginWithFacebook(response.name, response.email, response.picture.data.url)}
    /> */
}
