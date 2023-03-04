import { request } from "src/utils/functions";
import { LoginCredentials } from "../types";

export const login = async (credentials: {
  email: string;
  password: string;
}) => {
  console.info("login", process.env.SERVER_URL);
  const response = await request<LoginCredentials>(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/login`,
    {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        ...credentials,
      },
    }
  );

  console.log(response);

  return response;
};
