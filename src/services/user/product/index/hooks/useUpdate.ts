import axiosInstance from "@/lib/axios-instance";
import useRevalidateMutation from "@/lib/swr/useRevalidateMutation";
import type { ICreateProductPayload } from "../interfaces/request.type";

export default function useUpdate(productCategoryId: string) {
  const revalidateMutationsByKey = useRevalidateMutation();

  const updateData = async (payload: ICreateProductPayload) => {
    const {
      product_category_id,
      name,
      description,
      type,
      is_purchasable,
      is_sellable,
      is_stock,
      unit_id,
      product_units,
    } = payload;
    try {
      const res = await axiosInstance({
        withToken: true,
        tokenType: "user",
      }).post(`/material/${productCategoryId}`, {
        product_category_id,
        name,
        description,
        type,
        is_purchasable,
        is_sellable,
        is_stock,
        unit_id,
        product_units,
        _method: "PUT",
      });

      if (res.status === 200) {
        revalidateMutationsByKey(/^\/material/);
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
