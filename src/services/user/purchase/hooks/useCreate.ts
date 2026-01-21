import useRevalidateMutation from "@lib/swr/useRevalidateMutation";
import type { ICreatePurchasePayload } from "../interfaces/request.type";
import axiosInstance from "@lib/axios-instance";

export default function useCreate() {
  const revalidateMutationsByKey = useRevalidateMutation();

  const createData = async (payload: ICreatePurchasePayload) => {
    const {
      account_id,
      counter_account_id,
      supplier_id,
      material_id,
      unit_of_measure_id,
      document_number,
      date,
      due_date,
      qty,
      price,
    } = payload;

    try {
      const res = await axiosInstance({
        withToken: true,
        tokenType: "user",
      }).post(`/purchase`, {
        account_id,
        counter_account_id,
        supplier_id,
        material_id,
        unit_of_measure_id,
        document_number,
        date,
        due_date,
        qty,
        price,
      });

      if (res.status === 200) {
        revalidateMutationsByKey(/^\/purchase/);
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
