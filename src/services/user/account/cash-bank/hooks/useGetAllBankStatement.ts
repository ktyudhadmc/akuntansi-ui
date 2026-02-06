import { useCallback, useState } from "react";
import useSWR, { type Fetcher } from "swr";
import type { IGetAllBankStatementResponse } from "../interfaces/response-bank-statement.type";
import axiosInstance from "@lib/axios-instance";
import querystring from "query-string";
import { todayYMDString } from "@helpers/index";

export default function useGetAllBankStatement(accountId: string) {
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState(todayYMDString);
  const [endDate, setEndDate] = useState(todayYMDString);

  const fetcher: Fetcher<IGetAllBankStatementResponse, string> = (url) =>
    axiosInstance({ withToken: true, withCompany: true, tokenType: "user" })
      .get(url)
      .then((res) => res.data);

  const qs = querystring.stringify(
    { search, account_id: accountId, start_date: startDate, end_date: endDate },
    { skipEmptyString: true, skipNull: true },
  );

  const { data, error } = useSWR(`/bank-cash-transaction?${qs}`, fetcher);

  const onSetSearch = useCallback((search: string) => {
    setSearch(search);
  }, []);

  const onSetStartDate = useCallback((startDate: string) => {
    setStartDate(startDate);
  }, []);

  const onSetEndDate = useCallback((endDate: string) => {
    setEndDate(endDate);
  }, []);

  return {
    loading: !data && !error,
    data: data?.data,
    error,
    search,
    setSearch: onSetSearch,
    startDate,
    setStartDate: onSetStartDate,
    endDate,
    setEndDate: onSetEndDate,
  };
}
