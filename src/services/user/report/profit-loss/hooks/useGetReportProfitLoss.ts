import { useCallback, useState } from "react";
import useSWR, { type Fetcher } from "swr";
import type { IGetReportProfitLossResponse } from "../interfaces/response.type";
import axiosInstance from "@lib/axios-instance";
import querystring from "query-string";
import useUserStore from "@store/useUserStore";
import { parseMonthValue } from "@helpers/date";

export default function useGetAllTrialBalance() {
  const [search, setSearch] = useState("");
  const profitLossDate = useUserStore((state) => state.profitLossDate);

  const { year, month } = parseMonthValue(profitLossDate);

  const fetcher: Fetcher<IGetReportProfitLossResponse, string> = (url) =>
    axiosInstance({ withToken: true, withCompany: true, tokenType: "user" })
      .get(url)
      .then((res) => res.data);

  const qs = querystring.stringify(
    {
      search,
      year,
      month,
    },
    { skipEmptyString: true, skipNull: true },
  );

  const { data, error } = useSWR(`/reports/profit-loss?${qs}`, fetcher);

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
