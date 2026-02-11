import useRevalidateMutation from "@lib/swr/useRevalidateMutation";
import type { ICreateCustomerPayload } from "../interfaces/request.type";
import axiosInstance from "@lib/axios-instance";

export default function useCreate() {
  const revalidateMutationsByKey = useRevalidateMutation();

  const createData = async (payload: ICreateCustomerPayload) => {
    const { name, code, parent_unit } = payload;

    try {
      const res = await axiosInstance({
        withToken: true,
        withCompany: true,
        tokenType: "user",
      }).post(`/customer`, {
        name,
        code,
        parent_unit,
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

  return { createData };
}
