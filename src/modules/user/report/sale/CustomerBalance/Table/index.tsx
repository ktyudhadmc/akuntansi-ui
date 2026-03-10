import {
  Table,
  TableCell,
  TableRow,
  TableHeader,
  TableWrapper,
  TableBody,
  TableLoading,
  TableNotFound,
  // TableFoot,
} from "@components/ui/table";
import { isEmpty } from "lodash";
import TableItem from "./TableItem";
import TableFilter from "./TableFilter";

import useGetReportCustomerBalance from "@services/user/report/customer-balance/hooks/useGetReportCustomerBalance";
// import usePagination from "@hooks/usePagination";
// import { useEffect } from "react";
// import TablePagination from "@components/ui/table/TablePagination";
// import { formatIDRLocale } from "@helpers/currency";

export default function RSCustomerBalance() {
  const {
    loading,
    data,
    // summary,
    // pagination,
    // pageLimit,
    // setPageLimit,
    // setPageNum,
  } = useGetReportCustomerBalance();

  // const {
  //   currentPage,
  //   goNextPage,
  //   goPrevPage,
  //   setPageNum: onSetPageNum,
  // } = usePagination(pagination?.last_page || 1);

  // useEffect(() => {
  //   setPageNum(currentPage);
  // }, [currentPage]);

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
      <div className="space-y-6">
        <TableFilter />

        <TableWrapper isSticky>
          <Table>
            {/* Table Header */}
            <TableHeader>
              <TableRow>
                {/* <TableCell isHeader className="whitepsace-nowrap text-start">
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
                </TableCell> */}

                <TableCell isHeader className="whitespace-nowrap text-start">
                  Pelanggan
                </TableCell>

                <TableCell isHeader className="text-end">
                  Saldo Awal
                </TableCell>
                <TableCell isHeader className="text-end">
                  Pendapatan
                </TableCell>
                <TableCell isHeader className="text-end">
                  PPH
                </TableCell>
                <TableCell isHeader className="text-end">
                  Pembayaran
                </TableCell>
                <TableCell isHeader className="text-end">
                  Saldo Akhir
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
            {/* 
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
            </TableFoot> */}
          </Table>
        </TableWrapper>

        {/* <TablePagination
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
        /> */}
      </div>
    </div>
  );
}
