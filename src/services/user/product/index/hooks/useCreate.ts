import useRevalidateMutation from "@lib/swr/useRevalidateMutation";
import type { ICreateProductPayload } from "../interfaces/request.type";
import axiosInstance from "@lib/axios-instance";

export default function useCreate() {
  const revalidateMutationsByKey = useRevalidateMutation();

  const createData = async (payload: ICreateProductPayload) => {
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
      }).post(`/products`, {
        product_category_id,
        name,
        description,
        type,
        is_purchasable,
        is_sellable,
        is_stock,
        unit_id,
        product_units,
      });

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

  return { createData };
}
