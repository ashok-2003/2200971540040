export type Stack = "backend" | "frontend";
export type Level = "debug" | "info" | "warn" | "error" | "fatal";
export type PackageBackend =
  | "cache"
  | "controller"
  | "cron_job"
  | "db"
  | "domain"
  | "handler"
  | "repository"
  | "route"
  | "service";
export type PackageFrontend =
  | "api"
  | "component"
  | "hook"
  | "page"
  | "state"
  | "style"
export type PackageShared = "auth" | "config" | "middleware" | "utils";
export type LogPackage = PackageBackend | PackageFrontend | PackageShared;