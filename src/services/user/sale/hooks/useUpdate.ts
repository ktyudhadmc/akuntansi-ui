import axiosInstance from "@/lib/axios-instance";
import useRevalidateMutation from "@/lib/swr/useRevalidateMutation";
import type { ICreateSalePayload } from "../interfaces/request.type";

export default function useUpdate(saleId: string) {
  const revalidateMutationsByKey = useRevalidateMutation();

  const updateData = async (payload: ICreateSalePayload) => {
    const {
      account_id,
      customer_id,
      document_number,
      date,
      due_date,
      description,
      items,
    } = payload;
    try {
      const res = await axiosInstance({
        withToken: true,
        withCompany: true,
        tokenType: "user",
      }).post(`/sales/${saleId}`, {
        account_id,
        customer_id,
        document_number,
        date,
        due_date,
        description,
        items,
        _method: "PUT",
      });

      if (res.status === 200) {
        revalidateMutationsByKey(/^\/sales/);
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
