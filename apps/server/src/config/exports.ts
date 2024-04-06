import { config } from "dotenv";

config();

export const PORT = process.env.PORT || 3300;
export const JWT_SECRET = process.env.JWT_SECRET || null;

export const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID!;
export const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET!;
