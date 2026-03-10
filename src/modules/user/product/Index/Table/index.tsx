import { isEmpty } from "lodash";

import TableItem from "./TableItem";
import TableFilter from "./Header";
import useGetAll from "@services/user/product/index/hooks/useGetAll";
import { useEffect } from "react";
import usePagination from "@hooks/usePagination";
import TablePagination from "@components/ui/table/TablePagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableLoading,
  TableNotFound,
  TableRow,
  TableWrapper,
} from "@components/ui/table";

export default function ProductTable() {
  const {
    data,
    loading,
    pagination,
    pageLimit,
    setName,
    setCategory,
    setPageLimit,
    setPageNum,
  } = useGetAll();

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
      <TableFilter
        setSearchCallback={setName}
        setCategoryCallback={setCategory}
      />
      <TableWrapper isSticky>
        <Table>
          <TableHeader isSticky>
            <TableRow>
              <TableCell isHeader className="text-start">
                Kode
              </TableCell>
              <TableCell isHeader className="text-start">
                Nama
              </TableCell>
              <TableCell isHeader className="text-start">
                Kategori
              </TableCell>
              <TableCell isHeader className="text-start">
                Spesifikasi
              </TableCell>
              <th></th>
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading ? (
              <TableLoading colSpan={5} />
            ) : isEmpty(data) || !data ? (
              <TableNotFound colSpan={5} />
            ) : (
              data?.map((item, index) => {
                return <TableItem key={`table-product-${index}`} item={item} />;
              })
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
