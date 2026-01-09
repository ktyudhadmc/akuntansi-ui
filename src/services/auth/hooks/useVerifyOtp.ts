import Cookies from "js-cookie";
import { useShallow } from "zustand/shallow";

import axiosInstance from "@lib/axios-instance";
import type { Role } from "@services/auth/role.def";
import type { ILoginResponse } from "@services/auth/interfaces/user.types";
import useGlobalStore from "@store/useStore";

export default function useVerifyOtp(role: Role) {
  const { setRole } = useGlobalStore(
    useShallow((state) => ({
      setRole: state.setRole,
    }))
  );

  const handleVerifyOtp = async (phone: string, otp: string) => {
    const { data } = await axiosInstance({ withToken: false }).post(
      // `/auth/${role === "admin" ? "admin" : role}/verify-otp`,
      `/auth/verify-otp`,
      {
        phone,
        otp,
      }
    );

    const tokenName = `token${role === "admin" ? "" : `-${role}`}`;
    Cookies.set(tokenName, data.token as string, { expires: 365, path: "/" });

    setRole(role);

    return data as ILoginResponse;
  };

  return { handleVerifyOtp };
}
