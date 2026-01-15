import useRevalidateMutation from "@lib/swr/useRevalidateMutation";
import type { ICreateContactPayload } from "../interfaces/request.type";
import axiosInstance from "@lib/axios-instance";
import useGlobalStore from "@store/useStore";

export default function useCreate() {
  const currentCompany = useGlobalStore((state) => state.currentCompany);
  const revalidateMutationsByKey = useRevalidateMutation();

  const createData = async (payload: ICreateContactPayload) => {
    const { name, email, phone, is_supplier, is_customer } = payload;

    try {
      const res = await axiosInstance({
        withToken: true,
        tokenType: "user",
      }).post(`/company/${currentCompany?.id}/contacts`, {
        name,
        email,
        phone,
        is_supplier,
        is_customer,
      });

      if (res.status === 200) {
        revalidateMutationsByKey(/^\/contacts/);
      }

      return { response: res, error: null };
    } catch (error: any) {
      if (error.status >= 500) {
        return { response: null, error: "Server error" };
      }

      return { response: null, error: error.data.message };
    }
  };

  return { createData };
}
