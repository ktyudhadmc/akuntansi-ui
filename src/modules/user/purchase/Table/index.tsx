import TableHeader from "./Header";
import useGetAll from "@services/user/purchase/hooks/useGetAll";
import { isEmpty } from "lodash";
import TableItem from "./TableItem";
import PurchaseHeader from "../Header";
import { TableLoading, TableNotFound } from "@components/ui/table";
import { useState } from "react";

export default function PurchaseTable() {
  const { data, loading, setName } = useGetAll();
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  return (
    <>
      <PurchaseHeader
        loading={loading}
        expenseAmount={data?.summary.total_purchase ?? 0}
      />
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <div className="space-y-6">
          <TableHeader setSearchCallback={setName} />
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
            <div className="max-w-full overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-gray-100 dark:border-white/[0.05]">
                  <tr>
                    <th className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                      Tanggal
                    </th>
                    <th className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                      Nomor
                    </th>
                    <th className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                      Supplier
                    </th>
                    <th className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                      Rincian
                    </th>
                    <th className="px-5 py-3 font-medium text-gray-500 text-end text-theme-xs dark:text-gray-400">
                      Total Harga
                    </th>
                    <th></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                  {loading ? (
                    <TableLoading colSpan={6} />
                  ) : isEmpty(data?.purchases) || !data?.purchases ? (
                    <TableNotFound colSpan={6} />
                  ) : (
                    data?.purchases?.map((item, index) => {
                      return (
                        <TableItem
                          key={`table-purchase-${index}`}
                          item={item}
                          openDropdownId={openDropdownId}
                          setOpenDropdownId={setOpenDropdownId}
                        />
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
