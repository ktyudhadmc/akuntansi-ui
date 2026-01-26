import axiosInstance from "@/lib/axios-instance";
import useRevalidateMutation from "@/lib/swr/useRevalidateMutation";
import type { ICreateAdjustmentPayload } from "../interfaces/request.type";

export default function useUpdate(adjustmentId: string) {
  const revalidateMutationsByKey = useRevalidateMutation();

  const updateData = async (payload: ICreateAdjustmentPayload) => {
    const { material_id, description, date, qty, type } = payload;
    try {
      const res = await axiosInstance({
        withCompany: true,
        withToken: true,
        tokenType: "user",
      }).post(`/adjustment/${adjustmentId}`, {
        material_id,
        description,
        date,
        qty,
        type,
        _method: "PUT",
      });

      if (res.status === 200) {
        revalidateMutationsByKey(/^\/adjustment/);
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
