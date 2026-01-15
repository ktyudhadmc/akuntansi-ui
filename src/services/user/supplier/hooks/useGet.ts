import axiosInstance from "@/lib/axios-instance";
import useSWR, { type Fetcher } from "swr";
import type { IGetResponse } from "../interfaces/response.type";

export default function useGetSupplier(supplierId: string) {
  const fetcher: Fetcher<IGetResponse, string> = (url) =>
    axiosInstance({ withToken: true, tokenType: "user" })
      .get(url)
      .then((res) => res.data);

  const { data, error } = useSWR(`/supplier/${supplierId}`, fetcher);

  return {
    loading: !data && !error,
    data: data?.data,
    error,
  };
}
