import { useCallback, useState } from "react";
import useSWR, { type Fetcher } from "swr";
import querystring from "query-string";

import axiosInstance from "@lib/axios-instance";
import useUserStore from "@store/useUserStore";
import { parseMonthAndRange } from "@helpers/date";

import type { IGetReportSupplierBalance } from "../interfaces/response.type";

export default function useGetReportSupplierBalance() {
  const [search, setSearch] = useState("");
  const [pageNum, setPageNum] = useState(1);
  const [pageLimit, setPageLimit] = useState(10);
  const purchaseSupplierBalanceDate = useUserStore(
    (state) => state.purchaseSupplierBalanceDate,
  );

  const { start_date, end_date } = parseMonthAndRange(
    purchaseSupplierBalanceDate,
  );

  const fetcher: Fetcher<IGetReportSupplierBalance, string> = (url) =>
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

  const { data, error } = useSWR(`/reports/supplier-balance?${qs}`, fetcher);

  const onSetSearch = useCallback((search: string) => {
    setSearch(search);
  }, []);

  /** DUMY */
  const DUMMY_DATA: IGetReportSupplierBalance = {
    status: "success",
    message: "Data retrieved successfully",
    summary: {
      total_amount: 23500000 + 25000000,
      total_remaining: 13500000 + 5000000,
    },
    data: [
      {
        id: 1,
        name: "PT. Maju Bersama",
        total_amount: 23500000,
        total_remaining: 13500000,
        transaction: [
          {
            id: 101,
            transaction_date: new Date("2024-01-05"),
            due_date: new Date("2024-02-05"),
            invoice_number: "INV-2024-0001",
            description: "Pembelian Barang Elektronik",
            amount: 15000000,
            remaining: 5000000,
          },
          {
            id: 102,
            transaction_date: new Date("2024-01-15"),
            due_date: new Date("2024-02-15"),
            invoice_number: "INV-2024-0002",
            description: "Pembelian Peralatan Kantor",
            amount: 8500000,
            remaining: 8500000,
          },
        ],
      },
      {
        id: 2,
        name: "CV. Sumber Rejeki",
        total_amount: 25000000,
        total_remaining: 5000000,
        transaction: [
          {
            id: 201,
            transaction_date: new Date("2024-01-10"),
            due_date: new Date("2024-02-10"),
            invoice_number: "INV-2024-0003",
            description: "Jasa Konsultasi IT",
            amount: 25000000,
            remaining: 5000000,
          },
        ],
      },
    ],
    pagination: {
      current_page: 1,
      first_page_url: "https://api.example.com/reports/supplier-balance?page=1",
      from: 1,
      last_page: 1,
      last_page_url: "https://api.example.com/reports/supplier-balance?page=1",
      links: [
        { url: null, label: "&laquo; Previous", page: null, active: false },
        {
          url: "https://api.example.com/reports/supplier-balance?page=1",
          label: "1",
          page: 1,
          active: true,
        },
        { url: null, label: "Next &raquo;", page: null, active: false },
      ],
      next_page_url: null,
      path: "https://api.example.com/reports/supplier-balance",
      per_page: 10,
      prev_page_url: null,
      to: 2,
      total: 2,
    },
  };

  return {
    loading: !data && !error,
    data: data?.data ?? DUMMY_DATA.data,
    summary: data?.summary ?? DUMMY_DATA.summary,
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
