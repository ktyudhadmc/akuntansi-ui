import axiosInstance from "@/lib/axios-instance";
import useRevalidateMutation from "@/lib/swr/useRevalidateMutation";
import type { ICreateGeneralJournalPayload } from "../interfaces/request.type";

export default function useUpdate(generalJournalId: string) {
  const revalidateMutationsByKey = useRevalidateMutation();

  const updateData = async (payload: ICreateGeneralJournalPayload) => {
    const {
      date,
      document_number,
      reff,
      description,
      remarks,
      amount,
      account_id,
      counter_account_id,
    } = payload;
    try {
      const res = await axiosInstance({
        withToken: true,
        withCompany: true,
        tokenType: "user",
      }).post(`/memorial/${generalJournalId}`, {
        date,
        document_number,
        reff,
        description,
        remarks,
        amount,
        account_id,
        counter_account_id,
        _method: "PUT",
      });

      if (res.status === 200) {
        revalidateMutationsByKey(/^\/memorial/);
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
