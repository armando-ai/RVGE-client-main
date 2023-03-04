import { useEffect, useState } from "react";
import { request } from "src/utils/functions";
import { Response } from "src/utils/types";
import { useRouter } from "next/router";
import { getToken } from "src/utils/functions/get.token";

type Session = {
  id: string;
  name: string;
  email: string;
  image?: string;
};

type SessionError = null;

export const useSession = () => {
  const [session, setSession] = useState<Session>();
  const router = useRouter();

  useEffect(() => {
    const getSession = async () => {
      const response = await getToken();
      if (!response) {
        router.push("/auth");
        return;
      }

      const [accessToken] = response;

      const sessionResponse = await request<Response<Session, SessionError>>(
        `/users/session`,
        {
          method: "get",
          headers: {
            authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!sessionResponse) {
        router.push("/auth");
        return;
      }

      setSession(sessionResponse.data);
    };

    getSession();
  }, []);

  return { data: session };
};
