import useRevalidateMutation from "@lib/swr/useRevalidateMutation";
import type { ICreateUsagePayload } from "../interfaces/request.type";
import axiosInstance from "@lib/axios-instance";

export default function useCreate() {
  const revalidateMutationsByKey = useRevalidateMutation();

  const createData = async (payload: ICreateUsagePayload) => {
    const { material_id, description, date, qty } = payload;

    try {
      const res = await axiosInstance({
        withToken: true,
        withCompany: true,
        tokenType: "user",
      }).post(`/usage`, { material_id, description, date, qty });

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

  return { createData };
}
