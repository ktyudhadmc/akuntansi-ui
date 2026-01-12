import axiosInstance from "@lib/axios-instance";
import type { IMeResponse } from "@services/auth/interfaces/user.type";
import type { Role } from "@services/auth/role.def";

export const getMe = async (role: Role) => {
  const url = {
    admin: "auth/admin/me",
    company: "auth/company/me",
    user: "auth/me",
  }[role];

  const { data } = await axiosInstance({
    withToken: true,
    tokenType: role,
  }).get(url);

  return { data: data as IMeResponse, error: null };
};
