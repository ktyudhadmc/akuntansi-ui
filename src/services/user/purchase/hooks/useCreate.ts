import useRevalidateMutation from "@lib/swr/useRevalidateMutation";
import type { ICreatePurchasePayload } from "../interfaces/request.type";
import axiosInstance from "@lib/axios-instance";

export default function useCreate() {
  const revalidateMutationsByKey = useRevalidateMutation();

  const createData = async (payload: ICreatePurchasePayload) => {
    const {
      document_number,
      account_id,
      supplier_id,
      material_id,
      date,
      due_date,
      description,
      items,
    } = payload;

    try {
      const res = await axiosInstance({
        withCompany: true,
        withToken: true,
        tokenType: "user",
      }).post(`/purchase`, {
        account_id,
        supplier_id,
        material_id,
        document_number,
        date,
        due_date,
        description,
        items,
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
