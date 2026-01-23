import axiosInstance from "@/lib/axios-instance";
import useRevalidateMutation from "@/lib/swr/useRevalidateMutation";
import type { ICreateProductUnitPayload } from "../interfaces/request.type";

export default function useUpdate(productUnitId: string) {
  const revalidateMutationsByKey = useRevalidateMutation();

  const updateData = async (payload: ICreateProductUnitPayload) => {
    const { name, code } = payload;
    try {
      const res = await axiosInstance({
        withToken: true,
        tokenType: "user",
      }).post(`/uom/${productUnitId}`, {
        name,
        code,
        _method: "PUT",
      });

      if (res.status === 200) {
        revalidateMutationsByKey(/^\/uom/);
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
