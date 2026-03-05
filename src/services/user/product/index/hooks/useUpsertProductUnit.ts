import axiosInstance from "@/lib/axios-instance";
import useRevalidateMutation from "@/lib/swr/useRevalidateMutation";
import type { IUpsertProductUnitPayload } from "../interfaces/request.type";

export default function useUpsertProductUnit(productId: string) {
  const revalidateMutationsByKey = useRevalidateMutation();

  const upsertData = async (payload: IUpsertProductUnitPayload) => {
    try {
      const res = await axiosInstance({
        withToken: true,
        tokenType: "user",
      }).post(`/products/${productId}/units`, payload);

      if (res.status === 200) {
        revalidateMutationsByKey(/^\/products/);
      }

      return { response: res, error: null };
    } catch (error: any) {
      if (error.status >= 500) {
        return { response: null, error: "Server error" };
      }

      return { response: null, error: error.response.data.message };
    }
  };

  return { upsertData };
}
