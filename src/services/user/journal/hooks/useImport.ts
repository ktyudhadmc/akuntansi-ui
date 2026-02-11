import useRevalidateMutation from "@lib/swr/useRevalidateMutation";
import type { IImportJournalPayload } from "../interfaces/request.type";
import axiosInstance from "@lib/axios-instance";
import { jsonToFormData, type JSONValue } from "@helpers/json-to-form-data";

export default function useImport() {
  const revalidateMutationsByKey = useRevalidateMutation();

  const importData = async (payload: IImportJournalPayload) => {
    try {
      const res = await axiosInstance({
        withToken: true,
        withCompany: true,
        tokenType: "user",
      }).post(
        `/memorial/import`,
        jsonToFormData(payload as unknown as { [key: string]: JSONValue }),
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (res.status === 200) {
        revalidateMutationsByKey(/^\/memorial/);
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
