import axiosInstance from "@lib/axios-instance";
import type { ICurrentPeriodResponse } from "@services/auth/interfaces/period.type";

export const getActivePeriod = async () => {
  const { data } = await axiosInstance({
    withToken: true,
    tokenType: "user",
  }).get("periods/active");

  return { data: data as ICurrentPeriodResponse, error: null };
};
