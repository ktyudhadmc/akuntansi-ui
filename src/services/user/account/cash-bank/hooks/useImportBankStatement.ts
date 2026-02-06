import useRevalidateMutation from "@lib/swr/useRevalidateMutation";
import type { IImportBankStatementPayload } from "../interfaces/request.type";
import axiosInstance from "@lib/axios-instance";
import { jsonToFormData, type JSONValue } from "@helpers/json-to-form-data";

export default function useImportBankStatement() {
  const revalidateMutationsByKey = useRevalidateMutation();

  const importData = async (payload: IImportBankStatementPayload) => {
    try {
      const res = await axiosInstance({
        withToken: true,
        withCompany: true,
        tokenType: "user",
      }).post(
        `/bank-cash-transaction/import`,
        jsonToFormData(payload as unknown as { [key: string]: JSONValue }),
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (res.status === 200) {
        revalidateMutationsByKey(/^\/bank-cash-transaction/);
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
