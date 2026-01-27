import useRevalidateMutation from "@lib/swr/useRevalidateMutation";
import type { ICreateAccountPeriodsPayload } from "../interfaces/request.type";
import axiosInstance from "@lib/axios-instance";

export default function useOpen() {
  const revalidateMutationsByKey = useRevalidateMutation();

  const openData = async (payload: ICreateAccountPeriodsPayload) => {
    const { year, month } = payload;

    try {
      const res = await axiosInstance({
        withToken: true,
        withCompany: true,
        tokenType: "user",
      }).post("/inventory/re-open", {
        year,
        month,
      });

      if (res.status === 200) {
        revalidateMutationsByKey(/^\/inventory\/balances/);
      }

      return { response: res, error: null };
    } catch (error: any) {
      if (error.status >= 500) {
        return { response: null, error: "Server error" };
      }

      return { response: null, error: error.data.message };
    }
  };

  return { openData };
}
