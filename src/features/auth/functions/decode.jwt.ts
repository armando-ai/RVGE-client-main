import jwt from "jsonwebtoken";

type JwtType = {
  header: {
    alg: string;
    typ: string;
  };
  payload: {
    exp: number;
    iat: number;
    id: string;
  };
  signature: string;
};

export const decodeJwt = (token: string) => {
  const decoded = <JwtType>jwt.decode(token, { complete: true });

  return decoded;
};
