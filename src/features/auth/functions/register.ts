import { request } from "src/utils/functions";

type RegisterResponse = {
  error: string;
  status: number;
};

export const register = async (
  firstName: string,
  lastName: string,
  email: string,
  phoneNumber: string,
  password: string
) => {
  return await request<RegisterResponse>(`${process.env.SERVER_URL}/users`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: {
      user: {
        firstName,
        lastName,
        email,
        phoneNumber,
        password,
      },
    },
  });
};
