import useRevalidateMutation from "@lib/swr/useRevalidateMutation";
import type { ICreateBalanceConversionPayload } from "../interfaces/request.type";
import axiosInstance from "@lib/axios-instance";

export default function useCreateBalanceConversion() {
  const revalidateMutationsByKey = useRevalidateMutation();

  const createData = async (payload: ICreateBalanceConversionPayload) => {
    const { balance_conversion } = payload;

    try {
      const res = await axiosInstance({
        withToken: true,
        withCompany: true,
        tokenType: "user",
      }).post("/accounts/balance-conversion", {
        balance_conversion,
      });

      if (res.status === 200) {
        revalidateMutationsByKey(/^\/accounts\/balance-conversion/);
      }

      return { response: res, error: null };
    } catch (error: any) {
      if (error.status >= 500) {
        return { response: null, error: "Server error" };
      }

      return { response: null, error: error.response.data.message };
    }
  };

  return { createData };
}
