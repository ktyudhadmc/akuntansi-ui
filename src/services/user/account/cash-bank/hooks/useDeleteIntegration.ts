import axiosInstance from "@/lib/axios-instance";
import useRevalidateMutation from "@/lib/swr/useRevalidateMutation";

export default function useDeleteIntegration() {
  const revalidateMutationsByKey = useRevalidateMutation();

  const deleteData = async (accountSubTypeId: number) => {
    try {
      const res = await axiosInstance({
        withToken: true,
        withCompany: true,
        tokenType: "user",
      }).delete(`/bank-cash-account/${accountSubTypeId}`);

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

  return { deleteData };
}
