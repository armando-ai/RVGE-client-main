import { request } from "src/utils/functions";

export const getRefreshedToken = async (id: string, refreshToken: string) => {
  const response = await request<unknown>(`${process.env.SERVER_URL}`, {
    method: "patch",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${refreshToken}`,
    },
  });

  console.log(response);
};
