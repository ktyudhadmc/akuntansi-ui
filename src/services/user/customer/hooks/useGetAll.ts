import { useCallback, useState } from "react";
import useSWR, { type Fetcher } from "swr";
import type { IGetAllResponse } from "../interfaces/response.type";
import axiosInstance from "@lib/axios-instance";
import querystring from "query-string";
// import useGlobalStore from "@store/useStore";

export default function useGetAll() {
  // const currentCompany = useGlobalStore((state) => state.currentCompany);
  const [name, setName] = useState("");
  const [pageNum, setPageNum] = useState(1);
  const [pageLimit, setPageLimit] = useState(10);

  const fetcher: Fetcher<IGetAllResponse, string> = (url) =>
    axiosInstance({ withToken: true, tokenType: "user", withCompany: true })
      .get(url)
      .then((res) => res.data);

  const qs = querystring.stringify(
    { search: name, page_limit: pageLimit, page: pageNum },
    { skipEmptyString: true, skipNull: true },
  );

  const { data, error } = useSWR(
    // `/company/${currentCompany?.id}/contacts?${qs}`,
    `/customer?${qs}`,
    fetcher,
  );

  const onSetName = useCallback((name: string) => {
    setName(name);
  }, []);

  return {
    loading: !data && !error,
    data: data?.data,
    error,
    // pagination: data?.pagination,
    pageNum,
    setPageNum,
    pageLimit,
    setPageLimit,
    name,
    setName: onSetName,
  };
}
