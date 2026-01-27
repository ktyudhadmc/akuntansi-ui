import useRevalidateMutation from "@lib/swr/useRevalidateMutation";
import type { ICreateProductionPayload } from "../interfaces/request.type";
import axiosInstance from "@lib/axios-instance";

export default function useCreate() {
  const revalidateMutationsByKey = useRevalidateMutation();

  const createData = async (payload: ICreateProductionPayload) => {
    const { date, description, items } = payload;

    try {
      const res = await axiosInstance({
        withCompany: true,
        withToken: true,
        tokenType: "user",
      }).post(`/stock-conversion`, {
        date,
        description,
        items,
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

  return { createData };
}
