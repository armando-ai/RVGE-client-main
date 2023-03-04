export type LoginCredentials = {
  accessToken: string;
  refreshToken: string;
  success: boolean;
  error?: string;
  status: number;
};
