import axiosInstance from "@/lib/axios-instance";
import useRevalidateMutation from "@/lib/swr/useRevalidateMutation";
import type { ICreateTaxPayload } from "../interfaces/request.type";

export default function useUpdate(taxId: string) {
  const revalidateMutationsByKey = useRevalidateMutation();

  const updateData = async (payload: ICreateTaxPayload) => {
    const { name, rate, purchase_account_id, sale_account_id } = payload;
    try {
      const res = await axiosInstance({
        withToken: true,
        withCompany: true,
        tokenType: "user",
      }).post(`/tax/${taxId}`, {
        name,
        rate,
        purchase_account_id,
        sales_account_id: sale_account_id,
        _method: "PUT",
      });

      if (res.status === 200) {
        revalidateMutationsByKey(/^\/tax/);
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
