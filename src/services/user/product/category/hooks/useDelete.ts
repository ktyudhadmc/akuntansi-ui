import axiosInstance from "@/lib/axios-instance";
import useRevalidateMutation from "@/lib/swr/useRevalidateMutation";

export default function useDelete() {
  const revalidateMutationsByKey = useRevalidateMutation();

  const deleteData = async (productCategoryId: number) => {
    try {
      const res = await axiosInstance({
        withToken: true,
        tokenType: "user",
      }).delete(`/product-categories/${productCategoryId}`);

      if (res.status === 200) {
        revalidateMutationsByKey(/^\/product-categories/);
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
