import axiosInstance from "@/lib/axios-instance";
import useRevalidateMutation from "@/lib/swr/useRevalidateMutation";

export default function useDeleteBankStatement() {
  const revalidateMutationsByKey = useRevalidateMutation();

  const deleteData = async (bankStatementId: number) => {
    try {
      const res = await axiosInstance({
        withToken: true,
        withCompany: true,
        tokenType: "user",
      }).delete(`/bank-cash-transaction/${bankStatementId}`);

      if (res.status === 200) {
        revalidateMutationsByKey(/^\/bank-cash-transaction/);
      }

      return { response: res, error: null };
    } catch (error: any) {
      if (error.status >= 500) {
        return { response: null, error: "Server error" };
      }
      return { response: null, error: error.response.data.message };
    }
  };

  return { deleteData };
}
