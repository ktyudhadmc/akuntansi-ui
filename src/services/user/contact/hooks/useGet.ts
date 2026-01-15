import axiosInstance from "@/lib/axios-instance";
import useSWR, { type Fetcher } from "swr";
import type { IGetResponse } from "../interfaces/response.type";
import useGlobalStore from "@store/useStore";

export default function useGetAccount(contactId: string) {
  const currentCompany = useGlobalStore((state) => state.currentCompany);

  const fetcher: Fetcher<IGetResponse, string> = (url) =>
    axiosInstance({ withToken: true, tokenType: "user" })
      .get(url)
      .then((res) => res.data);

  const { data, error } = useSWR(
    `/company/${currentCompany?.id}/contacts/${contactId}`,
    fetcher
  );

  return {
    loading: !data && !error,
    data: data?.data,
    error,
  };
}
