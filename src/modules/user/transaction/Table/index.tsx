import {
  Table,
  TableWrapper,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
  TableLoading,
  TableNotFound,
} from "@components/ui/table";
import TableFilter from "./TableFilter";
import useGetAllTransaction from "@services/user/transaction/hooks/useGetAllTransaction";
import { isEmpty } from "lodash";
import TableItem from "./TableItem";
import TablePagination from "@components/ui/table/TablePagination";
import usePagination from "@hooks/usePagination";
import { useEffect } from "react";

export default function Transaction() {
  const {
    loading,
    data,
    pagination,
    pageLimit,
    setPageLimit,
    setPageNum,
    setSearch,
  } = useGetAllTransaction();

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
    <>
      <TableFilter setSearch={setSearch} />

      <TableWrapper>
        <Table>
          <TableHeader className="bg-gray-50 dark:bg-gray-700">
            <TableRow>
              <TableCell isHeader className="text-start">
                Tanggal
              </TableCell>
              <TableCell isHeader className="text-start">
                Nomor
              </TableCell>
              <TableCell isHeader className="text-start">
                Memo
              </TableCell>
              <TableCell isHeader className="text-start">
                Kontak
              </TableCell>
              <TableCell isHeader className="text-start">
                Tgl. Jatuh Tempo
              </TableCell>
              <TableCell isHeader className="text-center">
                Status
              </TableCell>
              <TableCell isHeader className="text-end">
                Sisa Tagihan
              </TableCell>
              <TableCell isHeader className="text-end">
                Total
              </TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableLoading colSpan={8} />
            ) : isEmpty(data) || !data ? (
              <TableNotFound colSpan={8} />
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
    </>
  );
}
