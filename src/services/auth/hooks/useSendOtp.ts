import { useShallow } from "zustand/shallow";

import axiosInstance from "@lib/axios-instance";
import type { Role } from "../role.def";
import type { ILoginResponse } from "../interfaces/user.types";
import useGlobalStore from "@store/useStore";

export default function useSendOtp(role: Role) {
  const { setRole } = useGlobalStore(
    useShallow((state) => ({
      setRole: state.setRole,
    }))
  );

  const handleSendOtp = async (phone: string) => {
    const { data } = await axiosInstance({ withToken: false }).post(
      // `/auth/${role === "admin" ? "admin" : role}/send-otp`,
      `/auth/request-otp`,
      {
        phone,
      }
    );

    setRole(role);

    return data as ILoginResponse;
  };

  return { handleSendOtp };
}
