import axiosInstance from "@/lib/axios-instance";
import useRevalidateMutation from "@/lib/swr/useRevalidateMutation";
import type { ICreateContactPayload } from "../interfaces/request.type";

export default function useUpdate(contactId: string) {
  const revalidateMutationsByKey = useRevalidateMutation();

  const updateData = async (payload: ICreateContactPayload) => {
    const { name, code } = payload;
    try {
      const res = await axiosInstance({
        withToken: true,
        withCompany: true,
        tokenType: "user",
      }).post(`/supplier/${contactId}`, {
        name,
        code,
        _method: "PUT",
      });

      if (res.status === 200) {
        revalidateMutationsByKey(/^\/supplier/);
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
