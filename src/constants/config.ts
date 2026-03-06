const appEnv = import.meta.env;

/** APP */
export const APP_URL = appEnv.VITE_APP_URL ?? "http://localhost:5173";
export const APP_NAME = appEnv.VITE_APP_NAME ?? "Dinamika Jurnal";

/** BACKEND */
export const BASE_API_URL =
  appEnv.VITE_BASE_API_URL ?? "http://127.0.0.1:8000/api/v1";

/** LOGING */
export const SENTRY_DSN = appEnv.VITE_SENTRY_DSN;
export const GA_ID = appEnv.VITE_GA_ID;

/** ACTIVE COMPANY */
export const LOCAL_STORAGE_COMPANY_KEY =
  appEnv.VITE_LOCAL_STORAGE_COMPANY_KEY ?? "active-company";

/** OFFICE */
export const OFFICE_WHATSAPP = appEnv.VITE_OFFICE_WHATSAPP;
export const OFFICE_EMAIL = appEnv.VITE_OFFICE_EMAIL;

/** TEMPLATE */
export const TEMPLATE_IMPORT_PURCHASE = appEnv.VITE_TEMPLATE_IMPORT_PURCHASE;
export const TEMPLATE_IMPORT_SALE = appEnv.VITE_TEMPLATE_IMPORT_SALE;
export const TEMPLATE_IMPORT_CASH_BANK = appEnv.VITE_TEMPLATE_IMPORT_CASH_BANK;
export const TEMPLATE_IMPORT_JOURNAL = appEnv.VITE_TEMPLATE_IMPORT_JOURNAL;

const config = {
  /** APP */
  APP_NAME,
  APP_URL,

  BASE_API_URL,

  /** ACTIVE COMPANY */
  LOCAL_STORAGE_COMPANY_KEY,

  /** LOGGING */
  SENTRY_DSN,
  GA_ID,

  /** OFFICE */
  OFFICE_EMAIL,
  OFFICE_WHATSAPP,

  /** TEMPLATE */
  TEMPLATE_IMPORT_SALE,
  TEMPLATE_IMPORT_PURCHASE,
  TEMPLATE_IMPORT_CASH_BANK,
  TEMPLATE_IMPORT_JOURNAL,
};

export default config;
