import axiosInstance from "@/lib/axios-instance";
import useRevalidateMutation from "@/lib/swr/useRevalidateMutation";
import type { ICreateAccountPayload } from "../interfaces/request.type";

export default function useUpdate(accountId: number) {
  const revalidateMutationsByKey = useRevalidateMutation();

  const updateData = async (payload: ICreateAccountPayload) => {
    const {
      company_id,
      code,
      name,
      level,
      is_posting,
      normal_balance,
      report_type,
    } = payload;
    try {
      const res = await axiosInstance({
        withToken: true,
        tokenType: "user",
      }).post(`/accounts/${accountId}`, {
        company_id,
        code,
        name,
        level,
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

  return { updateData };
}
