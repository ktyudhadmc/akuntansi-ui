import useRevalidateMutation from "@lib/swr/useRevalidateMutation";
import type { ICloseAccountPeriodsPayload } from "../interfaces/request.type";
import axiosInstance from "@lib/axios-instance";

export default function useClose() {
  const revalidateMutationsByKey = useRevalidateMutation();

  const closeData = async (payload: ICloseAccountPeriodsPayload) => {
    const { year, month } = payload;

    try {
      const res = await axiosInstance({
        withToken: true,
        withCompany: true,
        tokenType: "user",
      }).post("/closing/close", {
        year,
        month,
      });

      if (res.status === 200) {
        revalidateMutationsByKey(/^\/closing/);
      }

      return { response: res, error: null };
    } catch (error: any) {
      if (error.status >= 500) {
        return { response: null, error: "Server error" };
      }

      return { response: null, error: error.response.data.message };
    }
  };

  return { closeData };
}
