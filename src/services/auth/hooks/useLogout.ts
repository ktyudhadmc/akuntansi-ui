import Cookies from "js-cookie";

import type { Role } from "../role.def";
import axiosInstance from "@lib/axios-instance";

import { useUnsetCurrentCompany } from "./useUnsetCurrentCompany";

export default function useLogout() {
  const { unsetCompany } = useUnsetCurrentCompany();

  const handleLogout = async (role: Role) => {
    const tokenKeys = {
      admin: "token",
      company: "token-company",
      user: "token-user",
    } as const;

    const logoutUrls = {
      admin: "/admin/auth/logout",
      company: "/company/auth/logout",
      user: "/auth/logout",
    } as const;

    const token = Cookies.get(tokenKeys[role]) ?? "";

    if (!token) {
      return { data: null, status: 401 };
    }

    try {
      /** call api  */
      const { data } = await axiosInstance({
        withToken: true,
        tokenType: role,
      }).post(logoutUrls[role]);

      /** remove token */
      Cookies.remove(tokenKeys[role], { path: "/" });

      /** unset company */
      unsetCompany();

      return { data: data.message, error: null };
    } catch (error: any) {
      if (!error) {
        return { data: null, status: 500 };
      }

      return { data: error.message, status: error.status };
    }
  };

  return { handleLogout };
}
