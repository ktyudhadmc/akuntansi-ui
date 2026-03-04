import { useCallback, useState } from "react";
import useSWR, { type Fetcher } from "swr";
import querystring from "query-string";

import axiosInstance from "@lib/axios-instance";

import type { IGetProductTransactionResponse } from "../interfaces/response.type";

export default function useGetProductTransaction(productId: string) {
  const [search, setSearch] = useState("");
  const [pageNum, setPageNum] = useState(1);
  const [pageLimit, setPageLimit] = useState(10);
  const [transactionType, setTransactionType] = useState("");

  const fetcher: Fetcher<IGetProductTransactionResponse, string> = (url) =>
    axiosInstance({ withToken: true, withCompany: true, tokenType: "user" })
      .get(url)
      .then((res) => res.data);

  const qs = querystring.stringify(
    {
      search,
      transaction_type: transactionType,
    },
    { skipEmptyString: true, skipNull: true },
  );

  const { data, error } = useSWR(
    `/products/${productId}/transactions?${qs}`,
    fetcher,
  );

  const onSetSearch = useCallback((search: string) => {
    setSearch(search);
  }, []);

  const onSetTransactionType = useCallback((transactionType: string) => {
    setTransactionType(transactionType);
  }, []);

  const DUMMY_DATA: IGetProductTransactionResponse = {
    status: "success",
    message: "Data retrieved successfully",
    data: [
      {
        id: 1,
        transaction_number: "TRX-001",
        transaction_date: new Date("2024-01-15"),
        reference_type: "purchase",
        unit: { id: 1, name: "Pcs" },
        quanity: 1,
      },
      {
        id: 2,
        transaction_number: "TRX-002",
        transaction_date: new Date("2024-01-16"),
        reference_type: "sales",
        unit: { id: 2, name: "Kg" },
        quanity: 1,
      },
      {
        id: 3,
        transaction_number: "TRX-003",
        transaction_date: new Date("2024-01-17"),
        reference_type: "purchase",
        unit: { id: 3, name: "Lusin" },
        quanity: 1,
      },
    ],
    pagination: {
      current_page: 1,
      first_page_url: "https://api.example.com/products/transactions?page=1",
      from: 1,
      last_page: 1,
      last_page_url: "https://api.example.com/products/transactions?page=1",
      links: [
        { url: null, label: "&laquo; Previous", page: null, active: false },
        {
          url: "https://api.example.com/products/transactions?page=1",
          label: "1",
          page: 1,
          active: true,
        },
        { url: null, label: "Next &raquo;", page: null, active: false },
      ],
      next_page_url: null,
      path: "https://api.example.com/products/transactions",
      per_page: 10,
      prev_page_url: null,
      to: 3,
      total: 3,
    },
  };

  return {
    loading: !data && !error,
    data: data?.data ?? DUMMY_DATA.data,
    pagination: data?.pagination ?? DUMMY_DATA.pagination,
    pageNum,
    setPageNum,
    pageLimit,
    setPageLimit,
    error,
    search,
    setSearch: onSetSearch,
    transactionType,
    setTransactionType: onSetTransactionType,
  };
}
