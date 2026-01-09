import config from "@constants/config";
import axios from "axios";
import Cookies from "js-cookie";

import type { Role } from "@services/auth/role.def";
import type { CreateAxiosDefaults } from "axios";

type AxiosInstanceParams = {
  withToken: boolean;
  tokenType?: "admin" | "company" | "user";
};

const mapToken = new Map([
  ["admin", "token"],
  ["company", "token-company"],
  ["user", "token-user"],
]);

export default function axiosInstance(
  param?: AxiosInstanceParams,
  instanceSettings?: CreateAxiosDefaults
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

  const instance = axios.create({
    baseURL: config.BASE_API_URL,
    headers: param?.withToken
      ? {
          Authorization: `Bearer ${token}`,
        }
      : undefined,
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
    }
  );

  return instance;
}
