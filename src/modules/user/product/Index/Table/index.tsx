import { BeatLoader } from "react-spinners";
import { isEmpty } from "lodash";

import TableItem from "./TableItem";
import TableHeader from "./Header";
import useGetAll from "@services/user/product/index/hooks/useGetAll";
import { useEffect } from "react";
import usePagination from "@hooks/usePagination";
import TablePagination from "@components/ui/table/TablePagination";

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
      <TableHeader
        setSearchCallback={setName}
        setCategoryCallback={setCategory}
      />
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-100 dark:border-white/[0.05]">
              <tr>
                <th className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Kode
                </th>
                <th className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Nama
                </th>
                <th className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Kategori
                </th>
                <th className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Spesifikasi
                </th>
                <th></th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {loading ? (
                <tr>
                  <td colSpan={5} className="text-center py-16">
                    <div className="sweet-loading">
                      <BeatLoader color="var(--color-brand-600)" />
                    </div>
                  </td>
                </tr>
              ) : isEmpty(data) || !data ? (
                <tr>
                  <td colSpan={5} className="text-center py-4">
                    Data tidak tersedia
                  </td>
                </tr>
              ) : (
                data?.map((item, index) => {
                  return (
                    <TableItem key={`table-product-${index}`} item={item} />
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

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
