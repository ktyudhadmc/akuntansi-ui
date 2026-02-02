import { useCallback, useState } from "react";
import useSWR, { type Fetcher } from "swr";
import type { IGetLedgerByAccountResponse } from "../interfaces/response.type";
import axiosInstance from "@lib/axios-instance";
import querystring from "query-string";
import useUserStore from "@store/useUserStore";

export default function useGetLedgerByAccount(accountId: string | undefined) {
  const [search, setSearch] = useState("");
  const startDate = useUserStore((state) => state.ledgerStartDate);
  const endDate = useUserStore((state) => state.ledgerEndDate);

  const fetcher: Fetcher<IGetLedgerByAccountResponse, string> = (url) =>
    axiosInstance({ withToken: true, withCompany: true, tokenType: "user" })
      .get(url)
      .then((res) => res.data);

  const qs = querystring.stringify(
    { account_id: accountId, search, start_date: startDate, end_date: endDate },
    { skipEmptyString: true, skipNull: true },
  );

  const { data, error } = useSWR(
    // `/reports/account/${accountId}/ledger?${qs}`,
    `/ledger?${qs}`,
    fetcher,
  );

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
