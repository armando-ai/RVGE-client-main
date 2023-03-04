import { decodeJwt } from "./decode.jwt";

export const isAuthenticated = (token: string) => {
  const decoded = decodeJwt(token);
  const now = Math.floor(Date.now() / 1000);
  return decoded && decoded.payload.exp > now;
};
