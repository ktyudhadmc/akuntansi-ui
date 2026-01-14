import axiosInstance from "@/lib/axios-instance";
import useRevalidateMutation from "@/lib/swr/useRevalidateMutation";
import type { ICreateContactPayload } from "../interfaces/request.type";
import useGlobalStore from "@store/useStore";

export default function useUpdate(contactId: string) {
  const currentCompany = useGlobalStore((state) => state.currentCompany);
  const revalidateMutationsByKey = useRevalidateMutation();

  const updateData = async (payload: ICreateContactPayload) => {
    const { name, email, phone, is_supplier, is_customer } = payload;
    try {
      const res = await axiosInstance({
        withToken: true,
        tokenType: "user",
      }).post(`/company/${currentCompany?.id}/contacts/${contactId}`, {
        name,
        email,
        phone,
        is_supplier,
        is_customer,
        _method: "PUT",
      });

      if (res.status === 200) {
        revalidateMutationsByKey(/^\/contacts/);
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
