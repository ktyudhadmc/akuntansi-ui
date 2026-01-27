import axiosInstance from "@/lib/axios-instance";
import useRevalidateMutation from "@/lib/swr/useRevalidateMutation";
import type { ICreateProductionPayload } from "../interfaces/request.type";

export default function useUpdate(productionId: string) {
  const revalidateMutationsByKey = useRevalidateMutation();

  const updateData = async (payload: ICreateProductionPayload) => {
    const { date, description, items } = payload;
    try {
      const res = await axiosInstance({
        withToken: true,
        withCompany: true,
        tokenType: "user",
      }).post(`/stock-conversion/${productionId}`, {
        date,
        description,
        items,
        _method: "PUT",
      });

      if (res.status === 200) {
        revalidateMutationsByKey(/^\/stock-conversion/);
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
