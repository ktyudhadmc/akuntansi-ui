import useRevalidateMutation from "@lib/swr/useRevalidateMutation";
import type { ICreateSalePayload } from "../interfaces/request.type";
import axiosInstance from "@lib/axios-instance";

export default function useCreate() {
  const revalidateMutationsByKey = useRevalidateMutation();

  const createData = async (payload: ICreateSalePayload) => {
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
      }).post(`/sale`, {
        debit_account_id,
        credit_account_id,
        payment_due_date,
        paid_at,
        status,
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

  return { createData };
}
