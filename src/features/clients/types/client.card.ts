export type ClientType = "lead" | "client" | "other";

export type Card = {
  id: string;
  name: string;
  image?: string;
  email: string;
  phone: string;
  type: ClientType;
};
