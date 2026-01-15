import axiosInstance from "@/lib/axios-instance";
import useRevalidateMutation from "@/lib/swr/useRevalidateMutation";
import useGlobalStore from "@store/useStore";

export default function useDelete() {
  const revalidateMutationsByKey = useRevalidateMutation();
  const currentCompany = useGlobalStore((state) => state.currentCompany);

  const deleteData = async (contactId: number) => {
    try {
      const res = await axiosInstance({
        withToken: true,
        tokenType: "user",
      }).delete(`/company/${currentCompany?.id}/contacts/${contactId}`);

      if (res.status === 200) {
        revalidateMutationsByKey(/^\/contacts/);
      }

      return { response: res, error: null };
    } catch (error: any) {
      if (error.status >= 500) {
        return { response: null, error: "Server error" };
      }
      return { response: null, error: error.data.message };
    }
  };

  return { deleteData };
}
