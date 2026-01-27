import axiosInstance from "@/lib/axios-instance";
import useSWR, { type Fetcher } from "swr";
import type { IGetResponse } from "../interfaces/response.type";

export default function useGetProduction(productionId: string) {
  const fetcher: Fetcher<IGetResponse, string> = (url) =>
    axiosInstance({ withCompany: true, withToken: true, tokenType: "user" })
      .get(url)
      .then((res) => res.data);

  const { data, error } = useSWR(`/stock-conversion/${productionId}`, fetcher);

  return {
    loading: !data && !error,
    data: data?.data,
    error,
  };
}
