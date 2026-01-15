import useRevalidateMutation from "@lib/swr/useRevalidateMutation";
import type { ICreateProductPayload } from "../interfaces/request.type";
import axiosInstance from "@lib/axios-instance";

export default function useCreate() {
  const revalidateMutationsByKey = useRevalidateMutation();

  const createData = async (payload: ICreateProductPayload) => {
    const {
      code, name, specification, category } = payload;

    try {
      const res = await axiosInstance({
        withToken: true,
        tokenType: "user",
      }).post(`/material`, {
        code, name, specification, class: category
      });

      if (res.status === 200) {
        revalidateMutationsByKey(/^\/material/);
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
