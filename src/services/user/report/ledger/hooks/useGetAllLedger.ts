import { useCallback, useState } from "react";
import useSWR, { type Fetcher } from "swr";
import type { IGetAllLedgerResponse } from "../interfaces/response.type";
import axiosInstance from "@lib/axios-instance";
import querystring from "query-string";
import useUserStore from "@store/useUserStore";
import { parseMonthValue } from "@helpers/date";

export default function useGetAllLedger() {
  const [search, setSearch] = useState("");

  const startDate = useUserStore((state) => state.ledgerStartDate);
  const endDate = useUserStore((state) => state.ledgerEndDate);
  const ledgerDate = useUserStore((state) => state.ledgerDate);

  const { year, month } = parseMonthValue(ledgerDate);

  const fetcher: Fetcher<IGetAllLedgerResponse, string> = (url) =>
    axiosInstance({ withToken: true, withCompany: true, tokenType: "user" })
      .get(url)
      .then((res) => res.data);

  const qs = querystring.stringify(
    { search, year, month, start_date: startDate, end_date: endDate },
    { skipEmptyString: true, skipNull: true },
  );

  const { data, error } = useSWR(`/ledger/accordion?${qs}`, fetcher);

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
