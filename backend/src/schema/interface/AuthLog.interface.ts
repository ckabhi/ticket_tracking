export interface AuthLog {
  platform: string;
  createdAt: string;
  status: "active" | "expired";
  token: string;
}
