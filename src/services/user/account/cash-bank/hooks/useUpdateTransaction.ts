import useRevalidateMutation from "@lib/swr/useRevalidateMutation";
import type { ICreateTransactionPayload } from "../interfaces/request.type";
import axiosInstance from "@lib/axios-instance";

export default function useUpdateTransaction(transactionId: string) {
  const revalidateMutationsByKey = useRevalidateMutation();

  const updateData = async (payload: ICreateTransactionPayload) => {
    try {
      const res = await axiosInstance({
        withToken: true,
        withCompany: true,
        tokenType: "user",
      }).put(`/bank-cash-transaction/${transactionId}`, payload);

      if (res.status === 200) {
        revalidateMutationsByKey(/^\/bank-cash-transaction/);
      }

      return { response: res, error: null };
    } catch (error: any) {
      if (error.status >= 500) {
        return { response: null, error: "Server error" };
      }

      return { response: null, error: error.response.data.message };
    }
  };

  return { updateData };
}
