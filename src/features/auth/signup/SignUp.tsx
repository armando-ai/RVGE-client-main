import { useState } from "react";
import { Input } from "../components";
import { register } from "../functions";

type Props = {
  isSignIn: boolean;
  setIsSignIn: CallableFunction;
};

export const SignUp = ({ isSignIn, setIsSignIn }: Props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    const response = await register(
      firstName,
      lastName,
      email,
      phoneNumber,
      password
    );

    if (response.status !== 200) throw new Error(response.error);

    setIsSignIn(true);

    console.log(response);
  };

  return (
    <div
      className="relative mx-8 flex w-full flex-col
    items-center justify-center space-y-4 rounded bg-slate-200/80 px-8 py-4 shadow-xl
    shadow-slate-500 sm:mx-16"
    >
      <h1 className="relative py-2 text-5xl">Pipeline</h1>
      <div className="flex w-full flex-col space-y-2">
        <div
          className="flex-col space-y-2 sm:flex sm:w-full sm:flex-row sm:gap-4
          sm:space-y-0"
        >
          <Input
            type="text"
            onChange={setFirstName}
            value={firstName}
            label="First Name"
            className="border-b-2 border-slate-900 bg-transparent px-1
              pb-0.5 font-medium text-gray-700 outline-none"
          />
          <Input
            type="text"
            onChange={setLastName}
            value={lastName}
            label="Last Name"
            className="border-b-2 border-slate-900 bg-transparent px-1
              pb-0.5 font-medium text-gray-700 outline-none"
          />
        </div>
        <div
          className="flex-col space-y-2 sm:flex sm:w-full sm:flex-row sm:gap-4
          sm:space-y-0"
        >
          <Input
            type="email"
            onChange={setEmail}
            value={email}
            label="Email"
            className="border-b-2 border-slate-900 bg-transparent px-1
              pb-0.5 font-medium text-gray-700 outline-none sm:flex-1"
          />
          <Input
            type="tel"
            onChange={setPhoneNumber}
            value={phoneNumber}
            label="Phone Number"
            className="border-b-2 border-slate-900 bg-transparent px-1
              pb-0.5 font-medium text-gray-700 outline-none"
          />
        </div>
        <Input
          type="password"
          onChange={setPassword}
          value={password}
          label="Password"
          className="border-b-2 border-slate-900 bg-transparent px-1
          pb-0.5 font-medium text-gray-700 outline-none"
        />
      </div>
      <button
        onClick={() => handleRegister()}
        className="w-full rounded bg-slate-900 py-2
          font-medium tracking-wide text-white/90"
      >
        Sign Up
      </button>
      <div className="flex flex-col items-center justify-center space-y-2">
        <p
          onClick={() => setIsSignIn((prev: boolean) => !prev)}
          className="flex cursor-pointer items-center gap-2 text-sm"
        >
          Already have an account?
          <span className="py-0.5 font-medium text-blue-700/90">Sign In!</span>
        </p>
        {/* <p className='relative text-sm text-gray-600 cursor-pointer'>Forgot Password?</p> */}
      </div>
    </div>
  );
};
