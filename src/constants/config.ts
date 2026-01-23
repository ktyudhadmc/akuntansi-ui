const DEFAULT_API_URL = "http://127.0.0.1:8000/api/v1";

export const APP_NAME = import.meta.env.VITE_APP_NAME ?? "Dinamika Jurnal";

export const BASE_API_URL =
  import.meta.env.VITE_BASE_API_URL ?? DEFAULT_API_URL;

export const SENTRY_DSN = import.meta.env.VITE_SENTRY_DSN;
export const GA_ID = import.meta.env.VITE_GA_ID;

export const LOCAL_STORAGE_COMPANY_KEY = import.meta.env.VITE_LOCAL_STORAGE_COMPANY_KEY ?? "active-company";

const config = {
  APP_NAME,
  BASE_API_URL,
  SENTRY_DSN,
  GA_ID,
  LOCAL_STORAGE_COMPANY_KEY,
};

export default config;
