import axiosInstance from "@/lib/axios-instance";
import useRevalidateMutation from "@/lib/swr/useRevalidateMutation";

export default function useDelete() {
  const revalidateMutationsByKey = useRevalidateMutation();

  const deleteData = async (adjustmentId: number) => {
    try {
      const res = await axiosInstance({
        withCompany: true,
        withToken: true,
        tokenType: "user",
      }).delete(`/adjustment/${adjustmentId}`);

      if (res.status === 200) {
        revalidateMutationsByKey(/^\/adjustment/);
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
