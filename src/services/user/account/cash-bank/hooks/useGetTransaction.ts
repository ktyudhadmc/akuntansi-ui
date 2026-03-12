import axiosInstance from "@/lib/axios-instance";
import useSWR, { type Fetcher } from "swr";
import type { IGetTransactionResponse } from "../interfaces/response-transaction.type";

export default function useGetTransaction(bankStatementId: string) {
  const fetcher: Fetcher<IGetTransactionResponse, string> = (url) =>
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
