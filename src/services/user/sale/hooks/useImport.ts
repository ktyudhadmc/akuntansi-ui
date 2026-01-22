import useRevalidateMutation from "@lib/swr/useRevalidateMutation";
import type { IImportSalePayload } from "../interfaces/request.type";
import axiosInstance from "@lib/axios-instance";
import { jsonToFormData, type JSONValue } from "@helpers/json-to-form-data";

export default function useImport() {
  const revalidateMutationsByKey = useRevalidateMutation();

  const importData = async (payload: IImportSalePayload) => {
    try {
      const res = await axiosInstance({
        withToken: true,
        tokenType: "user",
      }).post(
        `/sale/import`,
        jsonToFormData(payload as unknown as { [key: string]: JSONValue }),
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (res.status === 200) {
        revalidateMutationsByKey(/^\/sale/);
      }

      return { response: res, error: null };
    } catch (error: any) {
      if (error.status >= 500) {
        return { response: null, error: "Server error" };
      }

      return { response: null, error: error.response.data.message };
    }
  };

  return { importData };
}
