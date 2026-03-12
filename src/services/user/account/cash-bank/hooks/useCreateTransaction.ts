import useRevalidateMutation from "@lib/swr/useRevalidateMutation";
import type { ICreateTransactionPayload } from "../interfaces/request.type";
import axiosInstance from "@lib/axios-instance";

export default function useCreateTransaction() {
  const revalidateMutationsByKey = useRevalidateMutation();

  const createData = async (payload: ICreateTransactionPayload) => {
    try {
      const res = await axiosInstance({
        withToken: true,
        withCompany: true,
        tokenType: "user",
      }).post("/bank-cash-transaction", payload);

      if (res.status === 200) {
        revalidateMutationsByKey(/^\/bank-cash-transaction/);
      }

      return { response: res, error: null };
    } catch (error: any) {
      if (error.status >= 500) {
        return { response: null, error: "Server error" };
      }

      return { response: null, error: error.data.message };
    }
  };

  return { createData };
}
