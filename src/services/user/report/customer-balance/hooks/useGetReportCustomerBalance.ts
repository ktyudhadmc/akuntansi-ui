import { useCallback, useState } from "react";
import useSWR, { type Fetcher } from "swr";
import querystring from "query-string";

import axiosInstance from "@lib/axios-instance";
import useUserStore from "@store/useUserStore";

import type { IGetReportCustomerBalance } from "../interfaces/response.type";
// import { DUMMY_DATA } from "../interfaces/dummy.data";

export default function useGetReportCustomerBalance() {
  const [search, setSearch] = useState("");
  const [pageNum, setPageNum] = useState(1);
  const [pageLimit, setPageLimit] = useState(10);
  const saleCustomerBalanceDate = useUserStore(
    (state) => state.saleCustomerBalanceDate,
  );

  const fetcher: Fetcher<IGetReportCustomerBalance, string> = (url) =>
    axiosInstance({ withToken: true, withCompany: true, tokenType: "user" })
      .get(url)
      .then((res) => res.data);

  const qs = querystring.stringify(
    {
      search,
      year_month: saleCustomerBalanceDate,
    },
    { skipEmptyString: true, skipNull: true },
  );

  const { data, error } = useSWR(`/receivable?${qs}`, fetcher);

  const onSetSearch = useCallback((search: string) => {
    setSearch(search);
  }, []);

  /** DUMY */

  return {
    loading: !data && !error,
    data: data?.data,
    // summary: data?.summary ?? DUMMY_DATA.summary,
    // pagination: data?.pagination ?? DUMMY_DATA.pagination,
    pageNum,
    setPageNum,
    pageLimit,
    setPageLimit,
    error,
    search,
    setSearch: onSetSearch,
  };
}
