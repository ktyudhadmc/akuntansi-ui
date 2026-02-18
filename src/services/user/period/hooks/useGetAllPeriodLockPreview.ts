import useSWR, { type Fetcher } from "swr";
import type { IGetAllPeriodLockPreviewResponse } from "../interfaces/response-lock-preview.type";
import axiosInstance from "@lib/axios-instance";

export default function useGetAllPeriodLockPreview(periodId: string) {
  const fetcher: Fetcher<IGetAllPeriodLockPreviewResponse, string> = (url) =>
    axiosInstance({ withToken: true, tokenType: "user", withCompany: true })
      .get(url)
      .then((res) => res.data);

  const { data, error } = useSWR(`/periods/${periodId}/lock-preview`, fetcher);

  return {
    loading: !data && !error,
    data: data?.data,
    error,
  };
}
