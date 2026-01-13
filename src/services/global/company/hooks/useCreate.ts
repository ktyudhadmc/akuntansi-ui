import useRevalidateMutation from "@lib/swr/useRevalidateMutation";
import type { ICreateCompanyPayload } from "../interfaces/request.type";
import axiosInstance from "@lib/axios-instance";

export default function useCreate() {
  const revalidateMutationsByKey = useRevalidateMutation();

  const createData = async (payload: ICreateCompanyPayload) => {
    const { code, name, email, phone, address } = payload;

    try {
      const res = await axiosInstance({
        withToken: true,
        tokenType: "user",
      }).post("/company", {
        code,
        name,
        email,
        phone,
        address,
      });

      if (res.status === 200) {
        revalidateMutationsByKey(/^\/company/);
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
