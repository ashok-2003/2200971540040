export const PACKAGE_NAMES = [
  // backend
  "cache",
  "controller",
  "cron_job",
  "db",
  "domain",
  "handler",
  "repository",
  "route",
  "service",
  // frontend
  "api",
  "component",
  "hook",
  "page",
  "state",
  "style",
  // shared
  "auth",
  "config",
  "middleware",
  "utils",
] as const;

export type PackageName = typeof PACKAGE_NAMES[number];
export type Stack = "backend" | "frontend";
export type Level = "debug" | "info" | "warn" | "error" | "fatal";
export type LogPackage = PackageName;