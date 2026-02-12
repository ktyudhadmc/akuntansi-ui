import { useCallback, useState } from "react";
import useSWR, { type Fetcher } from "swr";
import type { IGetAllResponse } from "../interfaces/response.type";
import axiosInstance from "@lib/axios-instance";
import querystring from "query-string";

export default function useGetAll() {
  const [name, setName] = useState("");
  const [pageNum, setPageNum] = useState(1);
  const [pageLimit, setPageLimit] = useState(10);
  const [category, setCategory] = useState("");

  const fetcher: Fetcher<IGetAllResponse, string> = (url) =>
    axiosInstance({ withToken: true, tokenType: "user", withCompany: true })
      .get(url)
      .then((res) => res.data);

  const qs = querystring.stringify(
    {
      search: name,
      page_limit: pageLimit,
      page: pageNum,
      category_id: category,
    },
    { skipEmptyString: true, skipNull: true },
  );

  const { data, error } = useSWR(`/material?${qs}`, fetcher);

  const onSetName = useCallback((name: string) => {
    setName(name);
  }, []);

  const onSetCategory = useCallback((category: string) => {
    setCategory(category);
  }, []);

  return {
    loading: !data && !error,
    data: data?.data,
    error,
    pagination: data?.meta,
    pageNum,
    setPageNum,
    pageLimit,
    setPageLimit,
    name,
    setName: onSetName,
    category,
    setCategory: onSetCategory,
  };
}
