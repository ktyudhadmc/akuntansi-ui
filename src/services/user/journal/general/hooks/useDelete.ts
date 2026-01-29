import axiosInstance from "@/lib/axios-instance";
import useRevalidateMutation from "@/lib/swr/useRevalidateMutation";

export default function useDelete() {
  const revalidateMutationsByKey = useRevalidateMutation();

  const deleteData = async (generalJournalId: number) => {
    try {
      const res = await axiosInstance({
        withToken: true,
        withCompany: true,
        tokenType: "user",
      }).delete(`/memorial/${generalJournalId}`);

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

  return { deleteData };
}
