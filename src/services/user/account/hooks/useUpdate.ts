import axiosInstance from "@/lib/axios-instance";
import useRevalidateMutation from "@/lib/swr/useRevalidateMutation";
import type { ICreateAccountPayload } from "../interfaces/request.type";

export default function useUpdate(accountId: string) {
  const revalidateMutationsByKey = useRevalidateMutation();

  const updateData = async (payload: ICreateAccountPayload) => {
    const { company_id, code, name, is_posting, normal_balance, report_type } =
      payload;
    try {
      const res = await axiosInstance({
        withToken: true,
        tokenType: "user",
      }).post(`/accounts/${parseInt(accountId)}`, {
        company_id,
        code,
        name,
        is_posting,
        normal_balance,
        report_type,
        _method: "PUT",
      });

      if (res.status === 200) {
        revalidateMutationsByKey(/^\/accounts/);
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
