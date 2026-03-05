import { useCallback, useState } from "react";
import useSWR, { type Fetcher } from "swr";
import querystring from "query-string";

import axiosInstance from "@lib/axios-instance";
import useUserStore from "@store/useUserStore";
import { parseMonthAndRange } from "@helpers/date";

import type { IGetReportExpenseDetailResponse } from "../interfaces/response.type";

export default function useGetReportExpenseDetail() {
  const [search, setSearch] = useState("");
  const [pageNum, setPageNum] = useState(1);
  const [pageLimit, setPageLimit] = useState(10);
  const purchaseExpenseDetailDate = useUserStore(
    (state) => state.purchaseExpenseDetailDate,
  );

  const { start_date, end_date } = parseMonthAndRange(
    purchaseExpenseDetailDate,
  );

  const fetcher: Fetcher<IGetReportExpenseDetailResponse, string> = (url) =>
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

  const { data, error } = useSWR(`/reports/expenses-detail?${qs}`, fetcher);

  const onSetSearch = useCallback((search: string) => {
    setSearch(search);
  }, []);

  const DUMMY_DATA: IGetReportExpenseDetailResponse = {
    summary: { total_amount: 25832200, total_remaining: 200000, total_tax: 0 },
    data: [
      {
        id: 1,
        code: "6-001",
        name: "Biaya Penyusutan",
        sub_total: 1083333,
        transactions: [
          {
            reference_id: 1,
            reference_type: "journal",
            transaction_date: new Date("2016-04-30"),
            transaction_number: "Journal Entry #5",
            transaction_status: { id: 1, name: "paid" },
            description: "(10001) Laptop 01",
            supplier: { id: 1, name: "" },
            tax: 0,
            amount: 250000,
            remaining: 0,
          },
          {
            reference_id: 2,
            reference_type: "journal",
            transaction_date: new Date("2016-04-30"),
            transaction_number: "Journal Entry #13",
            transaction_status: { id: 1, name: "paid" },
            description: "(10002) Motor Vehicle",
            supplier: { id: 1, name: "" },
            tax: 0,
            amount: 291667,
            remaining: 0,
          },
          {
            reference_id: 3,
            reference_type: "journal",
            transaction_date: new Date("2016-05-31"),
            transaction_number: "Journal Entry #6",
            transaction_status: { id: 1, name: "paid" },
            description: "(10001) Laptop 01",
            supplier: { id: 1, name: "" },
            tax: 0,
            amount: 250000,
            remaining: 0,
          },
          {
            reference_id: 4,
            reference_type: "journal",
            transaction_date: new Date("2016-05-31"),
            transaction_number: "Journal Entry #14",
            transaction_status: { id: 1, name: "paid" },
            description: "(10002) Motor Vehicle",
            supplier: { id: 1, name: "" },
            tax: 0,
            amount: 291667,
            remaining: 0,
          },
        ],
      },
      {
        id: 2,
        code: "6-002",
        name: "Fasilitas/Utilitas",
        sub_total: 3000000,
        transactions: [
          {
            reference_id: 5,
            reference_type: "expense",
            transaction_date: new Date("2016-05-31"),
            transaction_number: "Expense #10004",
            transaction_status: { id: 1, name: "paid" },
            description: "",
            supplier: { id: 1, name: "" },
            tax: 0,
            amount: 3000000,
            remaining: 0,
          },
        ],
      },
      {
        id: 3,
        code: "6-003",
        name: "Iklan & Promosi",
        sub_total: 4000000,
        transactions: [
          {
            reference_id: 6,
            reference_type: "journal",
            transaction_date: new Date("2016-04-30"),
            transaction_number: "Journal Entry #9",
            transaction_status: { id: 1, name: "paid" },
            description: "",
            supplier: { id: 1, name: "" },
            tax: 0,
            amount: 4000000,
            remaining: 0,
          },
        ],
      },
      {
        id: 4,
        code: "6-004",
        name: "Upah & Gaji",
        sub_total: 5000000,
        transactions: [
          {
            reference_id: 7,
            reference_type: "expense",
            transaction_date: new Date("2016-05-31"),
            transaction_number: "Expense #10002",
            transaction_status: { id: 1, name: "paid" },
            description: "",
            supplier: { id: 1, name: "" },
            tax: 0,
            amount: 5000000,
            remaining: 0,
          },
        ],
      },
    ],
    pagination: {
      current_page: 1,
      first_page_url: "https://api.example.com?page=1",
      from: 1,
      last_page: 1,
      last_page_url: "https://api.example.com?page=1",
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
      to: 4,
      total: 4,
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
