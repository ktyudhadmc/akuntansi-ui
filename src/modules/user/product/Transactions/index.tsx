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
import useGetProductTransaction from "@services/user/product/transaction/hooks/useGetProductTransaction";
import { isEmpty } from "lodash";
import { useParams } from "react-router-dom";
import TableItem from "./TableItem";
import Select from "@components/form/default/Select";
import type { Option } from "@def/option";
import TablePagination from "@components/ui/table/TablePagination";
import usePagination from "@hooks/usePagination";
import { useEffect } from "react";

export default function ProductTransaction() {
  const params = useParams();
  const {
    data,
    loading,
    transactionType,
    setTransactionType,
    pagination,
    pageLimit,
    setPageLimit,
    setPageNum,
  } = useGetProductTransaction(params.id as string);

  const {
    currentPage,
    goNextPage,
    goPrevPage,
    setPageNum: onSetPageNum,
  } = usePagination(pagination?.last_page || 1);

  useEffect(() => {
    setPageNum(currentPage);
  }, [currentPage]);

  const transactionTypes: Option[] = [
    { label: "Pembelian", value: "purchases" },
    { label: "Penjualan", value: "sales" },
    { label: "Produk", value: "invenotry" },
  ];

  return (
    <>
      <div className="flex lg:flex-row flex-col">
        <div className="lg:min-w-48 lg:w-auto w-full">
          <Select
            placeholder="Semua Tipe"
            defaultValue={transactionType}
            options={transactionTypes}
            name={"transaction_type"}
            onChange={setTransactionType}
          />
        </div>
      </div>

      <TableWrapper className="!rounded">
        <Table>
          <TableHeader className="bg-gray-50 dark:bg-gray-700">
            <TableRow>
              <TableCell isHeader className="text-start">
                Tanggal
              </TableCell>
              <TableCell isHeader className="text-start">
                Tipe
              </TableCell>
              <TableCell isHeader className="text-start">
                Qty
              </TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableLoading colSpan={3} />
            ) : isEmpty(data) || !data ? (
              <TableNotFound colSpan={3} />
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
