import useRevalidateMutation from "@lib/swr/useRevalidateMutation";
import type { IBulkDeleteBankStatementPayload } from "../interfaces/request.type";
import axiosInstance from "@lib/axios-instance";

export default function useBulkDeletBankStatement() {
  const revalidateMutationsByKey = useRevalidateMutation();

  const bulkDeleteData = async (payload: IBulkDeleteBankStatementPayload) => {
    const { ids } = payload;

    try {
      const res = await axiosInstance({
        withToken: true,
        withCompany: true,
        tokenType: "user",
      }).post("/accounts/cash-bank/bulk-delete", {
        ids,
      });

      if (res.status === 200) {
        revalidateMutationsByKey(/^\/accounts\/cash-bank/);
      }

      return { response: res, error: null };
    } catch (error: any) {
      if (error.status >= 500) {
        return { response: null, error: "Server error" };
      }

      return { response: null, error: error.response.data.message };
    }
  };

  return { bulkDeleteData };
}
