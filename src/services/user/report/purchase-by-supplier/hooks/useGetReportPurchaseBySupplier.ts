import { useCallback, useState } from "react";
import useSWR, { type Fetcher } from "swr";
import querystring from "query-string";

import axiosInstance from "@lib/axios-instance";
import useUserStore from "@store/useUserStore";
import { parseMonthAndRange } from "@helpers/date";

import type { IGetReportPurchaseBySupplierResponse } from "../interfaces/response.type";

export default function useGetReportPurchaseBySupplier() {
  const [search, setSearch] = useState("");
  const [pageNum, setPageNum] = useState(1);
  const [pageLimit, setPageLimit] = useState(10);
  const saleByCustomerDate = useUserStore((state) => state.saleByCustomerDate);

  const { start_date, end_date } = parseMonthAndRange(saleByCustomerDate);

  const fetcher: Fetcher<IGetReportPurchaseBySupplierResponse, string> = (
    url,
  ) =>
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

  const { data, error } = useSWR(
    `/reports/purchase-by-supplier?${qs}`,
    fetcher,
  );

  const onSetSearch = useCallback((search: string) => {
    setSearch(search);
  }, []);

  /** DUMY */
  const DUMMY_DATA: IGetReportPurchaseBySupplierResponse = {
    summary: {
      grand_total: 3250000,
    },
    data: [
      {
        id: 1,
        name: "PT. Dinamika Megatama Citra",
        sub_total: 1500000,
        transactions: [
          {
            id: 1,
            transaction_number: "TRX-003",
            transaction_date: new Date("2024-01-15"),
            transaction_type: { id: 1, name: "Penjualan" },
            product: { id: 1, name: "Ayam Broiler" },
            unit: { id: 1, name: "Kg" },
            description: "Deskripsi",
            quantity: 1,
            price: 30000,
            amount: 25,
            total: 750000,
          },
          {
            id: 2,
            transaction_number: "TRX-003",
            transaction_date: new Date("2024-01-18"),
            transaction_type: { id: 1, name: "Penjualan" },
            product: { id: 2, name: "Ayam Kampung" },
            unit: { id: 1, name: "Kg" },
            description: "Deskripsi",
            quantity: 1,
            price: 50000,
            amount: 15,
            total: 750000,
          },
        ],
      },
      {
        id: 2,
        name: "PT. Darma Multi Cipta",
        sub_total: 1000000,
        transactions: [
          {
            id: 3,
            transaction_number: "TRX-003",
            transaction_date: new Date("2024-01-16"),
            transaction_type: { id: 1, name: "Penjualan" },
            product: { id: 3, name: "Telur Ayam" },
            unit: { id: 2, name: "Butir" },
            description: "Deskripsi",
            quantity: 1,
            price: 2000,
            amount: 300,
            total: 600000,
          },
          {
            id: 4,
            transaction_number: "TRX-003",
            transaction_date: new Date("2024-01-20"),
            transaction_type: { id: 2, name: "Retur" },
            product: { id: 3, name: "Telur Ayam" },
            unit: { id: 2, name: "Butir" },
            description: "Deskripsi",
            quantity: 1,
            price: 2000,
            amount: 200,
            total: 400000,
          },
        ],
      },
      {
        id: 3,
        name: "PT. Darma Mega Citra",
        sub_total: 750000,
        transactions: [
          {
            id: 5,
            transaction_number: "TRX-003",
            transaction_date: new Date("2024-01-17"),
            transaction_type: { id: 1, name: "Penjualan" },
            product: { id: 1, name: "Ayam Broiler" },
            unit: { id: 1, name: "Kg" },
            description: "Deskripsi",
            quantity: 1,
            price: 30000,
            amount: 25,
            total: 750000,
          },
        ],
      },
    ],
    pagination: {
      current_page: 1,
      first_page_url:
        "https://api.example.com/reports/purchase-by-supplier?page=1",
      from: 1,
      last_page: 1,
      last_page_url:
        "https://api.example.com/reports/purchase-by-supplier?page=1",
      links: [
        { url: null, label: "&laquo; Previous", page: null, active: false },
        {
          url: "https://api.example.com/reports/purchase-by-supplier?page=1",
          label: "1",
          page: 1,
          active: true,
        },
        { url: null, label: "Next &raquo;", page: null, active: false },
      ],
      next_page_url: null,
      path: "https://api.example.com/reports/purchase-by-supplier",
      per_page: 10,
      prev_page_url: null,
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
