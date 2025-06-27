// src/store.ts
export interface UrlRecord {
  originalUrl: string;
  expiresAt: number;    // timestamp (ms)
  clicks: { at: number; referrer?: string }[];
}

export const urlStore: Record<string, UrlRecord> = {};
