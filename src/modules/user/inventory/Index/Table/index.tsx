import TableItem from "./TableItem";
import TableHeader from "./Header";

import useGetAll from "@services/user/inventory/index/hooks/useGetAll";
import { isEmpty } from "lodash";
import { TableLoading, TableNotFound } from "@components/ui/table";

export default function InventoryTable() {
  const { data, loading, setName } = useGetAll();

  return (
    <>
      <TableHeader setSearchCallback={(e) => setName(e)} />
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full">
            {/* Table Header */}
            <thead className="border-b border-gray-100 dark:border-white/[0.05]">
              <tr>
                <th className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Nama
                </th>
                <th className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Kuantitas
                </th>
                <th className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Jenis
                </th>
                <th className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Sumber persediaan
                </th>
                <th className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Tanggal transaksi
                </th>
                <th></th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {loading ? (
                <TableLoading colSpan={6} />
              ) : isEmpty(data) || !data ? (
                <TableNotFound colSpan={6}/>
              ) : (
                data.map((item, index) => {
                  return (
                    <TableItem key={`table-account-${index}`} item={item} />
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
