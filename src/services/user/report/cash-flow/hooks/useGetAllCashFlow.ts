import { useCallback, useState } from "react";
import useSWR, { type Fetcher } from "swr";
import type { IGetAllCashFlowResponse } from "../interfaces/response.type";
import axiosInstance from "@lib/axios-instance";
import querystring from "query-string";
import useUserStore from "@store/useUserStore";

export default function useGetAllCashFlow() {
  const [search, setSearch] = useState("");

  const startDate = useUserStore((state) => state.trialBalanceStartDate);
  const endDate = useUserStore((state) => state.trialBalanceEndDate);

  const fetcher: Fetcher<IGetAllCashFlowResponse, string> = (url) =>
    axiosInstance({ withToken: true, withCompany: true, tokenType: "user" })
      .get(url)
      .then((res) => res.data);

  const qs = querystring.stringify(
    { search, start_date: startDate, end_date: endDate },
    { skipEmptyString: true, skipNull: true },
  );

  const { data, error } = useSWR(`/reports/cash-flow?${qs}`, fetcher);

  const onSetSearch = useCallback((search: string) => {
    setSearch(search);
  }, []);

  return {
    loading: !data && !error,
    data: data?.data,
    error,
    search,
    setSearch: onSetSearch,
  };
}
