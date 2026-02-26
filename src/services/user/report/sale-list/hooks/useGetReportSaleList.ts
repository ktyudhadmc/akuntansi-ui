import { useCallback, useState } from "react";
import useSWR, { type Fetcher } from "swr";
import querystring from "query-string";

import axiosInstance from "@lib/axios-instance";
import useUserStore from "@store/useUserStore";
import { parseMonthAndRange } from "@helpers/date";

import type { IGetReportSaleListResponse } from "../interfaces/response.type";

export default function useGetReportSaleList() {
  const [search, setSearch] = useState("");
  const [pageNum, setPageNum] = useState(1);
  const [pageLimit, setPageLimit] = useState(10);
  const saleListDate = useUserStore((state) => state.saleListDate);

  const { start_date, end_date } = parseMonthAndRange(saleListDate);

  const fetcher: Fetcher<IGetReportSaleListResponse, string> = (url) =>
    axiosInstance({ withToken: true, withCompany: true, tokenType: "user" })
      .get(url)
      .then((res) => res.data);

  const qs = querystring.stringify(
    {
      search,
      start_date,
      end_date,
    },
    { skipEmptyString: true, skipNull: true },
  );

  const { data, error } = useSWR(`/reports/sale-list?${qs}`, fetcher);

  const onSetSearch = useCallback((search: string) => {
    setSearch(search);
  }, []);

  const DUMMY_DATA: IGetReportSaleListResponse = {
    summary: {
      original_amount: 2250000,
      total_paid: 1500000,
      balance_due: 750000,
    },
    data: [
      {
        id: 1,
        transaction_number: "TRX-001",
        transaction_date: new Date("2024-01-15"),
        transaction_type: { id: 1, name: "Penjualan" },
        transaction_status: { id: 1, name: "paid" },
        customer: { id: 1, name: "Budi Santoso" },
        note: "Catatan 1",
        description: "Deskripsi transaksi 1",
        original_amount: 500000,
        total_paid: 500000,
        balance_due: 0,
      },
      {
        id: 2,
        transaction_number: "TRX-002",
        transaction_date: new Date("2024-01-16"),
        transaction_type: { id: 1, name: "Penjualan" },
        transaction_status: { id: 2, name: "unpaid" },
        customer: { id: 2, name: "Siti Rahayu" },
        note: "Catatan 2",
        description: "Deskripsi transaksi 2",
        original_amount: 750000,
        total_paid: 0,
        balance_due: 750000,
      },
      {
        id: 3,
        transaction_number: "TRX-003",
        transaction_date: new Date("2024-01-17"),
        transaction_type: { id: 2, name: "Retur" },
        transaction_status: { id: 3, name: "partial" },
        customer: { id: 3, name: "Ahmad Wijaya" },
        note: "",
        description: "Deskripsi transaksi 3",
        original_amount: 1000000,
        total_paid: 1000000,
        balance_due: 0,
      },
    ],
    pagination: {
      current_page: 1,
      first_page_url: "https://api.example.com/reports/sale-list?page=1",
      last_page: 1,
      last_page_url: "https://api.example.com/reports/sale-list?page=1",
      links: [
        { url: null, label: "&laquo; Previous", page: null, active: false },
        {
          url: "https://api.example.com/reports/sale-list?page=1",
          label: "1",
          page: 1,
          active: true,
        },
        { url: null, label: "Next &raquo;", page: null, active: false },
      ],
      next_page_url: null,
      path: "https://api.example.com/reports/sale-list",
      per_page: 10,
      prev_page_url: null,
      from: 1,
      to: 3,
      total: 3,
    },
  };

  return {
    loading: !data && !error,
    summary: data?.summary ?? DUMMY_DATA.summary,
    data: data?.data ?? DUMMY_DATA.data,
    pagination: data?.pagination ?? DUMMY_DATA.pagination,
    pageNum,
    setPageNum,
    pageLimit,
    setPageLimit,
    error,
    search,
    setSearch: onSetSearch,
  };
}
