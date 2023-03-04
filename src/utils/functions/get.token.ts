import { request } from "./request";
import { Response } from "../types";

type RefreshResponse = {
  accessToken: string;
  refreshToken: string;
};

type RefreshError = {
  message: string;
  statusCode: number;
  status: "error";
};

export const getToken = async () => {
  const at = localStorage.getItem("accessToken");
  const rt = localStorage.getItem("refreshToken");

  if (!at || !rt) {
    return null;
  }

  const refreshResponse = await request<
    Response<RefreshResponse, RefreshError>
  >("/auth/refresh", {
    method: "post",
    headers: {
      authorization: `Bearer ${rt}`,
      "Content-Type": "application/json",
    },
  });

  if (refreshResponse.status === "error") {
    return null;
  }

  const { accessToken, refreshToken } = refreshResponse.data;
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);

  return [accessToken] as const;
};
