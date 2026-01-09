const DEFAULT_API_URL = "https://127.0.0.1:8000/api/v1";

export const APP_NAME = "Akuntansi by DMC";

export const BASE_API_URL =
  import.meta.env.VITE_BASE_API_URL ?? DEFAULT_API_URL;

const config = {
  APP_NAME,
  BASE_API_URL,
};

export default config;
