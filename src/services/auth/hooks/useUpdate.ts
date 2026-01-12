import axiosInstance from "@/lib/axios-instance";
import useRevalidateMutation from "@/lib/swr/useRevalidateMutation";
import type { ICreatePayload } from "../interfaces/create.type";

export default function useUpdate(userId: string) {
  const revalidateMutationsByKey = useRevalidateMutation();

  const updateData = async (payload: ICreatePayload) => {
    const { name, email, phone } = payload;
    try {
      const res = await axiosInstance({
        withToken: true,
        tokenType: "admin",
      }).post(`/user/update/${userId}`, { name, email, phone });

      if (res.status === 200) {
        revalidateMutationsByKey(/^\/auth\/me/);
      }

      return { response: res, error: null };
    } catch (error: any) {
      if (error.status >= 500) {
        return { response: null, error: "Server error" };
      }

      return { response: null, error: error.data.message };
    }
  };

  return { updateData };
}
