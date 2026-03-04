import {
  Table,
  TableCell,
  TableRow,
  TableHeader,
  TableWrapper,
  TableBody,
  TableLoading,
  TableNotFound,
  TableFoot,
} from "@components/ui/table";
import { isEmpty } from "lodash";
import TableItem from "./TableItem";
import TableFilter from "./TableFilter";

import usePagination from "@hooks/usePagination";
import { useEffect } from "react";
import TablePagination from "@components/ui/table/TablePagination";
import { formatIDRLocale } from "@helpers/currency";
import useGetReportSupplierBalance from "@services/user/report/supplier-balance/hooks/useGetReportSupplierBalance";

export default function RPSupplierBalance() {
  const {
    loading,
    summary,
    data,
    pagination,
    pageLimit,
    setPageLimit,
    setPageNum,
  } = useGetReportSupplierBalance();

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
                <TableCell isHeader className="whitepsace-nowrap text-start">
                  Tanggal
                </TableCell>
                <TableCell isHeader className="whitespace-nowrap text-start">
                  Nomor Transaksi
                </TableCell>
                <TableCell isHeader className="whitespace-nowrap text-start">
                  Jatuh Tempo
                </TableCell>
                <TableCell isHeader className="whitespace-nowrap text-start">
                  Deskripsi
                </TableCell>
                <TableCell isHeader className="text-end">
                  Jumlah
                </TableCell>
                <TableCell isHeader className="text-end">
                  Sisa Piutang
                </TableCell>
              </TableRow>
            </TableHeader>

            <TableBody>
              {loading ? (
                <TableLoading colSpan={6} />
              ) : isEmpty(data) || !data ? (
                <TableNotFound colSpan={6} />
              ) : (
                data.map((item, index) => (
                  <TableItem key={`table-item-${index}`} item={item} />
                ))
              )}
            </TableBody>

            <TableFoot>
              <TableRow className="border-t-2 border-t-gray-200 dark:border-t-gray-700">
                <TableCell
                  colSpan={4}
                  className="text-end !text-black dark:!text-white font-semibold"
                >
                  Grand Total
                </TableCell>
                <TableCell className="whitespace-nowrap text-end dark:!text-white !text-black font-medium">
                  {formatIDRLocale(summary.total_amount)}
                </TableCell>
                <TableCell className="whitespace-nowrap text-end dark:!text-white !text-black font-medium">
                  {formatIDRLocale(summary.total_remaining)}
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
