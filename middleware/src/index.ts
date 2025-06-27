import dotenv from "dotenv";
import axios from "axios";
import { Stack, Level, LogPackage, PACKAGE_NAMES } from "./type";

dotenv.config();
const AUTH_TOKEN = process.env.LOG_AUTH_TOKEN;

const VALID_STACKS: Stack[] = ["backend", "frontend"];
const VALID_LEVELS: Level[] = ["debug", "info", "warn", "error", "fatal"];
const VALID_PACKAGES: string[] = PACKAGE_NAMES as unknown as string[];

const LOG_API_URL = "http://20.244.56.144/evaluation-service/logs";

export async function log(
  stack: Stack,
  level: Level,
  pkg: LogPackage,
  message: string
): Promise<{ logID: string; message: string }> {
  if (!VALID_STACKS.includes(stack)) {
    throw new Error(`Invalid stack: ${stack}`);
  }
  if (!VALID_LEVELS.includes(level)) {
    throw new Error(`Invalid level: ${level}`);
  }
  if (!VALID_PACKAGES.includes(pkg)) {
    throw new Error(`Invalid package: ${pkg}`);
  }
  if (!message.trim()) {
    throw new Error(`Invalid message: must be non-empty`);
  }

  const payload = { stack, level, package: pkg, message };

  const headers: Record<string, string> = {
    "Content-Type": "application/json"
  };
  if (AUTH_TOKEN) headers["Authorization"] = `Bearer ${AUTH_TOKEN}`;

  try {
    const response = await axios.post(LOG_API_URL, payload, { headers });
    return response.data;
  } catch (error: any) {
    const status = error.response?.status;
    throw new Error(`Failed to send log${status ? `, status: ${status}` : ""}`);
  }
}
