import axiosInstance from "@/lib/axios-instance";
import useRevalidateMutation from "@/lib/swr/useRevalidateMutation";
import type { ICreateCustomerPayload } from "../interfaces/request.type";

export default function useUpdate(contactId: string) {
  const revalidateMutationsByKey = useRevalidateMutation();

  const updateData = async (payload: ICreateCustomerPayload) => {
    const { name, code, parent_unit } = payload;
    try {
      const res = await axiosInstance({
        withToken: true,
        tokenType: "user",
      }).post(`/customer/${contactId}`, {
        name,
        code,
        parent_unit,
        _method: "PUT",
      });

      if (res.status === 200) {
        revalidateMutationsByKey(/^\/customer/);
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
