import axiosInstance from "@/lib/axios-instance";
import useRevalidateMutation from "@/lib/swr/useRevalidateMutation";
import type { ICreateProductCategoryPayload } from "../interfaces/request.type";

export default function useUpdate(productCategoryId: string) {
  const revalidateMutationsByKey = useRevalidateMutation();

  const updateData = async (payload: ICreateProductCategoryPayload) => {
    const { name } = payload;
    try {
      const res = await axiosInstance({
        withToken: true,
        tokenType: "user",
      }).post(`/product-categories/${productCategoryId}`, {
        name,

        _method: "PUT",
      });

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

  return { updateData };
}
