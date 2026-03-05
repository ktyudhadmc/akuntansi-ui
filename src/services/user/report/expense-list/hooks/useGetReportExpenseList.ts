import { useCallback, useState } from "react";
import useSWR, { type Fetcher } from "swr";
import querystring from "query-string";

import axiosInstance from "@lib/axios-instance";
import useUserStore from "@store/useUserStore";
import { parseMonthAndRange } from "@helpers/date";

import type { IGetReportExpenseListResponse } from "../interfaces/response.type";

export default function useGetReportExpenseList() {
  const [search, setSearch] = useState("");
  const [pageNum, setPageNum] = useState(1);
  const [pageLimit, setPageLimit] = useState(10);
  const purchaseExpenseListDate = useUserStore(
    (state) => state.purchaseExpenseListDate,
  );

  const { start_date, end_date } = parseMonthAndRange(purchaseExpenseListDate);

  const fetcher: Fetcher<IGetReportExpenseListResponse, string> = (url) =>
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

  const { data, error } = useSWR(`/reports/expenses-list?${qs}`, fetcher);

  const onSetSearch = useCallback((search: string) => {
    setSearch(search);
  }, []);

  const DUMMY_DATA: IGetReportExpenseListResponse = {
    summary: { total_amount: 25832200, total_remaining: 200000, total_tax: 0 },
    data: [
      {
        reference_id: 1,
        reference_type: "expense",
        transaction_date: new Date("2016-01-31"),
        transaction_number: "Expense #10006",
        transaction_status: { id: 1, name: "partial" },
        account: { id: 1, code: "6-001", name: "Biaya Kantor" },
        description: "",
        supplier: { id: 1, name: "" },
        tax: 0,
        amount: 250000,
        remaining: 200000,
      },
      {
        reference_id: 2,
        reference_type: "journal",
        transaction_date: new Date("2016-01-31"),
        transaction_number: "Journal Entry #3",
        transaction_status: { id: 1, name: "paid" },
        account: { id: 2, code: "6-002", name: "Biaya Penyusutan" },
        description: "(10001) Laptop 01",
        supplier: { id: 2, name: "Supplier" },
        tax: 0,
        amount: 167200,
        remaining: 0,
      },
      {
        reference_id: 3,
        reference_type: "journal",
        transaction_date: new Date("2016-02-29"),
        transaction_number: "Journal Entry #8",
        transaction_status: { id: 1, name: "paid" },
        account: { id: 3, code: "6-003", name: "Iklan & Promosi" },
        description: "(10001) Laptop 01",
        supplier: { id: 3, name: "" },
        tax: 0,
        amount: 250000,
        remaining: 0,
      },
      {
        reference_id: 4,
        reference_type: "journal",
        transaction_date: new Date("2016-03-31"),
        transaction_number: "Journal Entry #4",
        transaction_status: { id: 1, name: "paid" },
        account: { id: 2, code: "6-002", name: "Biaya Penyusutan" },
        description: "",
        supplier: { id: 1, name: "" },
        tax: 0,
        amount: 250000,
        remaining: 0,
      },
      {
        reference_id: 5,
        reference_type: "expense",
        transaction_date: new Date("2016-03-31"),
        transaction_number: "Expense #10001",
        transaction_status: { id: 1, name: "paid" },
        account: { id: 4, code: "6-004", name: "Upah & Gaji" },
        description: "",
        supplier: { id: 1, name: "" },
        tax: 0,
        amount: 4000000,
        remaining: 0,
      },
      {
        reference_id: 6,
        reference_type: "expense",
        transaction_date: new Date("2016-03-31"),
        transaction_number: "Expense #10003",
        transaction_status: { id: 1, name: "paid" },
        account: { id: 5, code: "6-005", name: "Fasilitas/Utilitas" },
        description: "",
        supplier: { id: 1, name: "" },
        tax: 0,
        amount: 250000,
        remaining: 0,
      },
      {
        reference_id: 7,
        reference_type: "journal",
        transaction_date: new Date("2016-03-31"),
        transaction_number: "Journal Entry #10",
        transaction_status: { id: 1, name: "paid" },
        account: { id: 6, code: "6-006", name: "Pajak & Lisensi" },
        description: "",
        supplier: { id: 1, name: "" },
        tax: 0,
        amount: 5000000,
        remaining: 0,
      },
      {
        reference_id: 8,
        reference_type: "expense",
        transaction_date: new Date("2016-04-01"),
        transaction_number: "Expense #10005",
        transaction_status: { id: 1, name: "paid" },
        account: { id: 7, code: "6-007", name: "Makanan Hiburan" },
        description: "",
        supplier: { id: 1, name: "" },
        tax: 0,
        amount: 3000000,
        remaining: 0,
      },
      {
        reference_id: 9,
        reference_type: "journal",
        transaction_date: new Date("2016-04-30"),
        transaction_number: "Journal Entry #5",
        transaction_status: { id: 1, name: "paid" },
        account: { id: 2, code: "6-002", name: "Biaya Penyusutan" },
        description: "(10001) Laptop 01",
        supplier: { id: 1, name: "" },
        tax: 0,
        amount: 0,
        remaining: 0,
      },
      {
        reference_id: 10,
        reference_type: "journal",
        transaction_date: new Date("2016-04-30"),
        transaction_number: "Journal Entry #9",
        transaction_status: { id: 1, name: "paid" },
        account: { id: 3, code: "6-003", name: "Iklan & Promosi" },
        description: "",
        supplier: { id: 1, name: "" },
        tax: 0,
        amount: 415000,
        remaining: 0,
      },
    ],
    pagination: {
      current_page: 1,
      first_page_url: "https://api.example.com?page=1",
      from: 1,
      last_page: 1,
      last_page_url: "https://api.example.com?page=2",
      links: [
        { url: null, label: "&laquo; Previous", page: null, active: false },
        {
          url: "https://api.example.com?page=1",
          label: "1",
          page: 1,
          active: true,
        },
        { url: null, label: "Next &raquo;", page: null, active: false },
      ],
      next_page_url: null,
      path: "https://api.example.com",
      per_page: 10,
      prev_page_url: null,
      to: 10,
      total: 10,
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
