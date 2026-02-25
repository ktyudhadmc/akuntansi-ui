import axiosInstance from "@/lib/axios-instance";
import useSWR, { type Fetcher } from "swr";
import type { IGetBankStatementResponse } from "../interfaces/response-bank-statement.type";

export default function useGetBankStatement(bankStatementId: string) {
  const fetcher: Fetcher<IGetBankStatementResponse, string> = (url) =>
    axiosInstance({ withCompany: true, withToken: true, tokenType: "user" })
      .get(url)
      .then((res) => res.data);

  const { data, error } = useSWR(
    `/bank-cash-transaction/${bankStatementId}`,
    fetcher,
  );

  return {
    loading: !data && !error,
    data: data?.data,
    error,
  };
}
