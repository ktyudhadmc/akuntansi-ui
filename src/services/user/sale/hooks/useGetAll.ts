import { useCallback, useState } from "react";
import useSWR, { type Fetcher } from "swr";
import type { IGetAllResponse } from "../interfaces/response.type";
import axiosInstance from "@lib/axios-instance";
import querystring from "query-string";
import useUserStore from "@store/useUserStore";
import { parseMonthAndRange } from "@helpers/date";

export default function useGetAll() {
  const [name, setName] = useState("");

  // const startTransactionDate = useUserStore(
  //   (state) => state.startTransactionDate,
  // );
  // const endTransactionDate = useUserStore((state) => state.endTransactionDate);
  // const startDueDate = useUserStore((state) => state.startDueDate);
  // const endDueDate = useUserStore((state) => state.endDueDate);
  const customer = useUserStore((state) => state.customer);
  const saleDate = useUserStore((state) => state.saleDate);
  const { start_date, end_date } = parseMonthAndRange(saleDate);

  const fetcher: Fetcher<IGetAllResponse, string> = (url) =>
    axiosInstance({ withToken: true, tokenType: "user", withCompany: true })
      .get(url)
      .then((res) => res.data);

  const qs = querystring.stringify(
    {
      search: name,
      start_date,
      end_date,
      // start_transaction_date: startTransactionDate,
      // end_transaction_date: endTransactionDate,
      // start_due_date: startDueDate,
      // end_due_date: endDueDate,
      customer_id: customer,
    },
    { skipEmptyString: true, skipNull: true },
  );

  const { data, error } = useSWR(`/sales?${qs}`, fetcher);

  const onSetName = useCallback((name: string) => {
    setName(name);
  }, []);

  return {
    loading: !data && !error,
    data: data?.data,
    error,
    name,
    setName: onSetName,
  };
}
