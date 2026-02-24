import { useCallback, useState } from "react";
import useSWR, { type Fetcher } from "swr";
import type { IGetAllResponse } from "../interfaces/response.type";
import axiosInstance from "@lib/axios-instance";
import querystring from "query-string";
import useUserStore from "@store/useUserStore";
import { parseMonthAndRange } from "@helpers/date";

export default function useGetReportBalanceSheet() {
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const balanceSheetDate = useUserStore((state) => state.balanceSheetDate);
  const { start_date, end_date } = parseMonthAndRange(balanceSheetDate);

  const fetcher: Fetcher<IGetAllResponse, string> = (url) =>
    axiosInstance({ withToken: true, withCompany: true, tokenType: "user" })
      .get(url)
      .then((res) => res.data);

  const qs = querystring.stringify(
    { search: name, category_id: categoryId, start_date, end_date },
    { skipEmptyString: true, skipNull: true },
  );

  const { data, error } = useSWR(`/accounts?${qs}`, fetcher);

  const onSetName = useCallback((name: string) => {
    setName(name);
  }, []);

  const onSetCategory = useCallback((categoryId: string) => {
    setCategoryId(categoryId);
  }, []);

  return {
    loading: !data && !error,
    data: data?.data,
    error,
    name,
    setName: onSetName,
    categoryId,
    setCategoryId: onSetCategory,
  };
}
