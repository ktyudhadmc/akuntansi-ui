import useRevalidateMutation from "@lib/swr/useRevalidateMutation";
import type { IBulkDeleteAccountPayload } from "../interfaces/request.type";
import axiosInstance from "@lib/axios-instance";

export default function useBulkDelete() {
  const revalidateMutationsByKey = useRevalidateMutation();

  const createData = async (payload: IBulkDeleteAccountPayload) => {
    const { ids } = payload;

    try {
      const res = await axiosInstance({
        withToken: true,
        withCompany: true,
        tokenType: "user",
      }).post("/accounts/bulk-delete", {
        ids,
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
