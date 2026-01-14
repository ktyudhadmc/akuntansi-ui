import Cookies from "js-cookie";
import { useShallow } from "zustand/shallow";

import axiosInstance from "@lib/axios-instance";
import type { Role } from "@services/auth/role.def";
import type { ILoginResponse } from "@services/auth/interfaces/user.type";
import useGlobalStore from "@store/useStore";
import { getMe } from "./useGetMe";

export default function useVerifyOtp(role: Role) {
  const { setRole, setMe } = useGlobalStore(
    useShallow((state) => ({
      setRole: state.setRole,
      setMe: state.setMe,
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

    const { data: meData } = await getMe(role);

    setRole(role);
    if (meData.data) {
      setMe(meData.data);
    }

    return data as ILoginResponse;
  };

  return { handleVerifyOtp };
}
