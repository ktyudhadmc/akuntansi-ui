import useRevalidateMutation from "@lib/swr/useRevalidateMutation";
import type { ICreateAccountPayload } from "../interfaces/request.type";
import axiosInstance from "@lib/axios-instance";

export default function useCreate() {
  const revalidateMutationsByKey = useRevalidateMutation();

  const createData = async (payload: ICreateAccountPayload) => {
    const {
      company_id,
      code,
      name,
      is_posting,
      normal_balance,
      report_type,
    } = payload;

    try {
      const res = await axiosInstance({
        withToken: true,
        tokenType: "user",
      }).post("/accounts", {
        company_id,
        code,
        name,
        is_posting,
        normal_balance,
        report_type,
      });

      if (res.status === 200) {
        revalidateMutationsByKey(/^\/accounts/);
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
