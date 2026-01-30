import useRevalidateMutation from "@lib/swr/useRevalidateMutation";
import type { ICreateIntegrationBankAccountPayload } from "../interfaces/request.type";
import axiosInstance from "@lib/axios-instance";

export default function useCreateIntegration() {
  const revalidateMutationsByKey = useRevalidateMutation();

  const createData = async (payload: ICreateIntegrationBankAccountPayload) => {
    const { account_id, type, is_active } = payload;

    try {
      const res = await axiosInstance({
        withToken: true,
        withCompany: true,
        tokenType: "user",
      }).post("/bank-cash-account", {
        account_id,
        type,
        is_active,
      });

      if (res.status === 200) {
        revalidateMutationsByKey(/^\/bank-cash-account/);
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
