import axiosInstance from "@/lib/axios-instance";
import useRevalidateMutation from "@/lib/swr/useRevalidateMutation";
import type { ICreateInventoryPayload } from "../interfaces/request.type";

export default function useUpdate(inventoryId: string) {
  const revalidateMutationsByKey = useRevalidateMutation();

  const updateData = async (payload: ICreateInventoryPayload) => {
    const { name } = payload;
    try {
      const res = await axiosInstance({
        withCompany: true,
        withToken: true,
        tokenType: "user",
      }).post(`/inventory/${inventoryId}`, {
        name,
        _method: "PUT",
      });

      if (res.status === 200) {
        revalidateMutationsByKey(/^\/inventory/);
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
