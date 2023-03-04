import { request } from "src/utils/functions";

type FacebookResponse = {
  error: string | null;
  status: number;
  accessToken: string;
  refreshToken: string;
};

export const loginWithFacebook = async (
  name: string,
  email: string,
  image: string
) => {
  const [firstName, lastName] = name.split(" ");

  const response = await request<FacebookResponse>(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/login/facebook`,
    {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        user: {
          firstName,
          lastName,
          email,
          image,
        },
      },
    }
  );

  console.log(response);

  return response;
};
