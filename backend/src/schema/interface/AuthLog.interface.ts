export interface AuthLog {
  platform: string;
  createdAt: string;
  status: "active" | "expired";
  RefreshToken: string;
  IPAddress: string;
}
