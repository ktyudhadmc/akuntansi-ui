import axiosInstance from "@/lib/axios-instance";
import useRevalidateMutation from "@/lib/swr/useRevalidateMutation";
import type { ICreateUsagePayload } from "../interfaces/request.type";

export default function useUpdate(usageId: string) {
  const revalidateMutationsByKey = useRevalidateMutation();

  const updateData = async (payload: ICreateUsagePayload) => {
    const { material_id, description, date, qty } = payload;
    try {
      const res = await axiosInstance({
        withCompany: true,
        withToken: true,
        tokenType: "user",
      }).post(`/usage/${usageId}`, {
        material_id,
        description,
        date,
        qty,
        _method: "PUT",
      });

      if (res.status === 200) {
        revalidateMutationsByKey(/^\/usage/);
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
