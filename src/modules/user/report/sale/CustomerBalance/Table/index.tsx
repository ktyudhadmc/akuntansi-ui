import {
  Table,
  TableCell,
  TableRow,
  TableHeader,
  TableWrapper,
  TableBody,
  TableLoading,
  TableNotFound,
} from "@components/ui/table";
import { isEmpty } from "lodash";
import TableItem from "./TableItem";
import TableFilter from "./TableFilter";

import useGetReportCustomerBalance from "@services/user/report/customer-balance/hooks/useGetReportSaleByCustomer";
import usePagination from "@hooks/usePagination";
import { useEffect } from "react";
import TablePagination from "@components/ui/table/TablePagination";

export default function RSCustomerBalance() {
  const { loading, data, pagination, pageLimit, setPageLimit, setPageNum } =
    useGetReportCustomerBalance();

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
                <TableCell isHeader className="whitepsace-nowrap text-start">Tanggal</TableCell>
                <TableCell isHeader className="whitespace-nowrap text-start">Nomor Transaksi</TableCell>
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
