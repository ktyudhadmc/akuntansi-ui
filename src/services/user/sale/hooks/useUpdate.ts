import axiosInstance from "@/lib/axios-instance";
import useRevalidateMutation from "@/lib/swr/useRevalidateMutation";
import type { ICreateSalePayload } from "../interfaces/request.type";

export default function useUpdate(purchaseId: string) {
  const revalidateMutationsByKey = useRevalidateMutation();

  const updateData = async (payload: ICreateSalePayload) => {
    const {
      debit_account_id,
      credit_account_id,
      payment_due_date,
      paid_at,
      status,
    } = payload;
    try {
      const res = await axiosInstance({
        withToken: true,
        tokenType: "user",
      }).post(`/sale/${purchaseId}`, {
        debit_account_id,
        credit_account_id,
        payment_due_date,
        paid_at,
        status,
        _method: "PUT",
      });

      if (res.status === 200) {
        revalidateMutationsByKey(/^\/sale/);
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
