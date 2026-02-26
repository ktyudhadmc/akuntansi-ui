import { isEmpty } from "lodash";
import { useEffect } from "react";

import usePagination from "@hooks/usePagination";

import TableItem from "./TableItem";
import TableFilter from "./TableFilter";
import {
  Table,
  TableBody,
  TableCell,
  TableFoot,
  TableHeader,
  TableLoading,
  TableNotFound,
  TableRow,
  TableWrapper,
} from "@components/ui/table";
import TablePagination from "@components/ui/table/TablePagination";

import { formatIDRLocale } from "@helpers/currency";
import useGetReportSaleByCustomer from "@services/user/report/sale-by-customer/hooks/useGetReportSaleByCustomer";

export default function RSSaleByCustomer() {
  const {
    loading,
    summary,
    data,
    pagination,
    pageLimit,
    setPageLimit,
    setPageNum,
  } = useGetReportSaleByCustomer();

  const {
    currentPage,
    goNextPage,
    goPrevPage,
    setPageNum: onSetPageNum,
  } = usePagination(pagination?.last_page || 1);

  useEffect(() => {
    setPageNum(currentPage);
  }, [currentPage]);

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
      <div className="space-y-6">
        <TableFilter />

        <TableWrapper>
          <Table>
            <TableHeader className="bg-gray-50 dark:bg-gray-700">
              <TableRow>
                <TableCell isHeader className="text-start">
                  Tanggal
                </TableCell>
                <TableCell isHeader className="text-start">
                  Tipe Transaksi
                </TableCell>
                <TableCell isHeader className="text-start">
                  Nomor Transaksi
                </TableCell>
                <TableCell isHeader className="text-start">
                  Produk
                </TableCell>
                <TableCell isHeader className="text-start">
                  Keterangan
                </TableCell>
                <TableCell isHeader className="text-start">
                  Kuantitas
                </TableCell>
                <TableCell isHeader className="text-start">
                  Satuan
                </TableCell>
                <TableCell isHeader className="text-end">
                  Harga Satuan
                </TableCell>
                <TableCell isHeader className="text-end">
                  Total Nominal Tagihan
                </TableCell>
              </TableRow>
            </TableHeader>

            <TableBody>
              {loading ? (
                <TableLoading colSpan={9} />
              ) : isEmpty(data) || !data ? (
                <TableNotFound colSpan={9} />
              ) : (
                data.map((item, index) => (
                  <TableItem key={`table-item-${index}`} item={item} />
                ))
              )}
            </TableBody>

            <TableFoot className="border-t border-gray-300 dark:border-gray-500">
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="text-start font-medium !text-black dark:!text-white !text-sm"
                >
                  Total
                </TableCell>
                <TableCell className="text-end font-medium !text-black dark:!text-white !text-sm">
                  {formatIDRLocale(summary?.grand_total ?? 0, {
                    withSymbol: true,
                  })}
                </TableCell>
              </TableRow>
            </TableFoot>
          </Table>
        </TableWrapper>

        <TablePagination
          goNextPage={goNextPage}
          goPrevPage={goPrevPage}
          setPageNum={onSetPageNum}
          total={pagination?.total}
          perPage={pagination?.per_page}
          to={pagination?.to}
          pageLimit={pageLimit}
          setPageLimit={(limit) => setPageLimit(limit)}
          currentPage={currentPage}
          lastPage={pagination?.last_page}
        />
      </div>
    </div>
  );
}
