import { BeatLoader } from "react-spinners";
import { isEmpty } from "lodash";
import TableItem from "./TableItem";
import useGetAll from "@services/user/customer/hooks/useGetAll";
import TableHeader from "./TableHeader";
import { Table, TableBody } from "@components/ui/table";
import TablePagination from "@components/ui/table/TablePagination";
import usePagination from "@hooks/usePagination";
import { useEffect } from "react";

export default function CustomerTable() {
  const lastPage = 10;
  const { data, loading, pageLimit, setPageLimit, setName, setPageNum } =
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
      <TableHeader setSearchCallback={setName} />
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <Table className="w-full">
            {/* Table Header */}
            <thead className="border-b border-gray-100 dark:border-white/[0.05]">
              <tr>
                <th className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Kode Pelanggan
                </th>
                <th className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Nama
                </th>
                <th></th>
              </tr>
            </thead>

            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {loading ? (
                <tr>
                  <td colSpan={3} className="text-center py-16">
                    <div className="sweet-loading">
                      <BeatLoader color="var(--color-brand-600)" />
                    </div>
                  </td>
                </tr>
              ) : isEmpty(data) || !data ? (
                <tr>
                  <td colSpan={3} className="text-center py-4">
                    Data tidak tersedia
                  </td>
                </tr>
              ) : (
                data?.slice(0, 50).map((item, index) => {
                  return (
                    <TableItem key={`table-customer-${index}`} item={item} />
                  );
                })
              )}
            </TableBody>
          </Table>
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
