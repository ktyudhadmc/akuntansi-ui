import { useCallback, useState } from "react";
import useSWR, { type Fetcher } from "swr";
import type { IGetAllResponse } from "../interfaces/response.type";
import axiosInstance from "@lib/axios-instance";
import querystring from "query-string";
import useUserStore from "@store/useUserStore";
// import useGlobalStore from "@store/useStore";

export default function useGetAll() {
  // const currentCompany = useGlobalStore((state) => state.currentCompany);
  const [name, setName] = useState("");
  const startTransactionDate = useUserStore(
    (state) => state.startTransactionDate,
  );
  const endTransactionDate = useUserStore((state) => state.endTransactionDate);
  const startDueDate = useUserStore((state) => state.startDueDate);
  const endDueDate = useUserStore((state) => state.endDueDate);

  const fetcher: Fetcher<IGetAllResponse, string> = (url) =>
    axiosInstance({ withToken: true, tokenType: "user" })
      .get(url)
      .then((res) => res.data);

  const qs = querystring.stringify(
    {
      search: name,
      start_transaction_date: startTransactionDate,
      end_transaction_date: endTransactionDate,
      start_due_date: startDueDate,
      end_due_date: endDueDate,
    },
    { skipEmptyString: true, skipNull: true },
  );

  const { data, error } = useSWR(
    // `/company/${currentCompany?.id}/contacts?${qs}`,
    `/sale?${qs}`,
    fetcher,
  );

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
