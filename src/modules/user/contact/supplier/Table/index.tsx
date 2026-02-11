import { isEmpty } from "lodash";
import TableItem from "./TableItem";
import useGetAll from "@services/user/supplier/hooks/useGetAll";
import TableAction from "./TableAction";
import {
  TableBody,
  TableCell,
  TableHeader,
  TableLoading,
  TableNotFound,
  TableRow,
} from "@components/ui/table";
import TablePagination from "@components/ui/table/TablePagination";
import usePagination from "@hooks/usePagination";
import { useEffect } from "react";

export default function SupplierTable() {
  const lastPage = 10;
  const { data, loading, pageLimit, setName, setPageNum, setPageLimit } =
    useGetAll();
  const {
    currentPage,
    goNextPage,
    goPrevPage,
    setPageNum: onSetPageNum,
  } = usePagination(lastPage);

  useEffect(() => {
    setPageNum(currentPage);
  }, [currentPage]);

  return (
    <>
      <TableAction setSearchCallback={setName} />
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full">
            {/* Table Header */}
            <TableHeader>
              <TableRow>
                <TableCell isHeader>Kode Supplier</TableCell>
                <TableCell isHeader>Nama</TableCell>
                <th></th>
              </TableRow>
            </TableHeader>

            <TableBody>
              {loading ? (
                <TableLoading colSpan={3} />
              ) : isEmpty(data) || !data ? (
                <TableNotFound colSpan={3} />
              ) : (
                data?.slice(0, 50).map((item, index) => {
                  return (
                    <TableItem key={`table-contact-${index}`} item={item} />
                  );
                })
              )}
            </TableBody>
          </table>
        </div>
      </div>

      <TablePagination
        goNextPage={goNextPage}
        goPrevPage={goPrevPage}
        setPageNum={onSetPageNum}
        total={100}
        perPage={10}
        pageLimit={pageLimit}
        setPageLimit={(limit) => setPageLimit(limit)}
        currentPage={currentPage}
        lastPage={lastPage}
      />
    </>
  );
}
