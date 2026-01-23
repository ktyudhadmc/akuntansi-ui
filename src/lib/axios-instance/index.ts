import config from "@constants/config";
import axios from "axios";
import Cookies from "js-cookie";

import type { Role } from "@services/auth/role.def";
import type { CreateAxiosDefaults } from "axios";

type AxiosInstanceParams = {
  withToken: boolean;
  withCompany?: boolean;
  tokenType?: "admin" | "company" | "user";
  currentCompany?: string;
};

const mapToken = new Map([
  ["admin", "token"],
  ["company", "token-company"],
  ["user", "token-user"],
]);

export default function axiosInstance(
  param?: AxiosInstanceParams,
  instanceSettings?: CreateAxiosDefaults,
) {
  const _activeRole = Cookies.get("token")
    ? "admin"
    : Cookies.get("token-company")
      ? "company"
      : "user";

  const role = (
    param?.tokenType === "user" ? _activeRole : param?.tokenType
  ) as Role;
  const token = role ? Cookies.get(mapToken.get(role) as string) : null;

  const storageCompany = localStorage.getItem(config.LOCAL_STORAGE_COMPANY_KEY);

  /** HEADER */
  const headers: Record<string, string> = {};

  if (param?.withToken) {
    headers.Authorization = `Bearer ${token}`;
  }

  if (param?.withCompany && storageCompany) {
    headers["x-company"] = storageCompany;
  }

  const instance = axios.create({
    baseURL: config.BASE_API_URL,
    headers: Object.keys(headers).length ? headers : undefined,
    ...instanceSettings,
  });

  /** INTERCEPTOR */
  instance.interceptors.response.use(
    (resp) => resp,
    (err) => {
      if (err.response.status === 401 && token && param?.tokenType) {
        Cookies.remove(mapToken.get(param?.tokenType) as string);
      }

      return Promise.reject(err);
    },
  );

  return instance;
}
