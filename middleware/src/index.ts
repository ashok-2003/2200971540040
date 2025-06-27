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
): Promise<void> {
  // If no auth token, skip logging
  if (!AUTH_TOKEN) {
    console.warn('Logging skipped: no AUTH_TOKEN provided');
    return;
  }

  // Validate inputs
  if (!VALID_STACKS.includes(stack)) {
    console.warn(`Invalid stack: ${stack}`);
    return;
  }
  if (!VALID_LEVELS.includes(level)) {
    console.warn(`Invalid level: ${level}`);
    return;
  }
  if (!VALID_PACKAGES.includes(pkg)) {
    console.warn(`Invalid package: ${pkg}`);
    return;
  }
  if (!message.trim()) {
    console.warn('Invalid message: must be non-empty');
    return;
  }

  const payload = { stack, level, package: pkg, message };
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${AUTH_TOKEN}`
  };

  try {
    await axios.post(LOG_API_URL, payload, { headers });
  } catch (error: any) {
    console.error(`Logging error: ${error.message || error}`);
  }
}

