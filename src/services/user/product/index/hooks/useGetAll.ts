import { useCallback, useState } from "react";
import useSWR, { type Fetcher } from "swr";
import type { IGetAllResponse } from "../interfaces/response.type";
import axiosInstance from "@lib/axios-instance";
import querystring from "query-string";
// import useGlobalStore from "@store/useStore";

export default function useGetAll() {
  // const currentCompany = useGlobalStore((state) => state.currentCompany);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");

  const fetcher: Fetcher<IGetAllResponse, string> = (url) =>
   axiosInstance({ withToken: true, tokenType: "user", withCompany: true })
      .get(url)
      .then((res) => res.data);

  const qs = querystring.stringify(
    { name, category_id: category },
    { skipEmptyString: true, skipNull: true },
  );

  const { data, error } = useSWR(
    // `/company/${currentCompany?.id}/contacts?${qs}`,
    `/material?${qs}`,
    fetcher,
  );

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
    name,
    setName: onSetName,
    category,
    setCategory: onSetCategory,
  };
}
