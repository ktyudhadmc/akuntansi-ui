import useRevalidateMutation from "@lib/swr/useRevalidateMutation";
import type { ICreateAdjustmentPayload } from "../interfaces/request.type";
import axiosInstance from "@lib/axios-instance";

export default function useCreate() {
  const revalidateMutationsByKey = useRevalidateMutation();

  const createData = async (payload: ICreateAdjustmentPayload) => {
    const { material_id, description, date, qty, type } = payload;

    try {
      const res = await axiosInstance({
        withToken: true,
        withCompany: true,
        tokenType: "user",
      }).post(`/adjustment`, { material_id, description, date, qty, type });

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

  return { createData };
}
