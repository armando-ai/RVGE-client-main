import { request } from "src/utils/functions";
import { TokenResponse } from "@react-oauth/google";

type GooglePayload = {
  email: string;
  email_verified: boolean;
  family_name: string;
  given_name: string;
  name: string;
  picture: string;
};

type GoogleResponse = {
  error: string | null;
  status: number;
  accessToken: string;
  refreshToken: string;
};

export const loginWithGoogle = async (
  response: Omit<TokenResponse, "error" | "error_description" | "error_uri">
) => {
  console.log(response);
  const { access_token, token_type, scope, ...rest } = response;

  const data = await request<GooglePayload>(
    "https://www.googleapis.com/oauth2/v1/userinfo?alt=json",
    {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        authorization: `${token_type} ${access_token}`,
      },
    }
  );

  console.log(data);

  const { email, email_verified, family_name, given_name, picture } = data;

  const googleResponse = await request<GoogleResponse>(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/login/google`,
    {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        user: {
          email,
          verified: email_verified,
          lastName: family_name,
          firstName: given_name,
          image: picture,
        },
      },
    }
  );

  if (googleResponse.status === 200) {
    const { accessToken, refreshToken } = googleResponse;
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
  }

  return googleResponse;
};
