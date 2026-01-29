import useRevalidateMutation from "@lib/swr/useRevalidateMutation";
import type { ICreateGeneralJournalPayload } from "../interfaces/request.type";
import axiosInstance from "@lib/axios-instance";

export default function useCreate() {
  const revalidateMutationsByKey = useRevalidateMutation();

  const createData = async (payload: ICreateGeneralJournalPayload) => {
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
        withCompany: true,
        withToken: true,
        tokenType: "user",
      }).post(`/memorial`, {
        date,
        document_number,
        reff,
        description,
        remarks,
        amount,
        account_id,
        counter_account_id,
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

  return { createData };
}
