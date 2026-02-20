import { useCallback, useState } from "react";
import useSWR, { type Fetcher } from "swr";
import type { IGetAllResponse } from "../interfaces/response.type";
import axiosInstance from "@lib/axios-instance";
import querystring from "query-string";
import useUserStore from "@store/useUserStore";
import { parseMonthAndRange } from "@helpers/date";

export default function useGetAll() {
  const [search, setSearch] = useState("");

  const journalDate = useUserStore((state) => state.journalDate);
  // const startDate = useUserStore((state) => state.startDate);
  // const endDate = useUserStore((state) => state.endDate);
  const { start_date, end_date } = parseMonthAndRange(journalDate);

  const fetcher: Fetcher<IGetAllResponse, string> = (url) =>
    axiosInstance({ withToken: true, withCompany: true, tokenType: "user" })
      .get(url)
      .then((res) => res.data);

  const qs = querystring.stringify(
    {
      search,
      start_date,
      end_date,
      //  start_date: startDate, end_date: endDate
    },
    { skipEmptyString: true, skipNull: true },
  );

  const { data, error } = useSWR(`/memorial?${qs}`, fetcher);

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
