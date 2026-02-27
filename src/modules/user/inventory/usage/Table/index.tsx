import { isEmpty } from "lodash";
import TableItem from "./TableItem";
import TableHeader from "./Header";

import useGetAll from "@services/user/inventory/usage/hooks/useGetAll";
import { TableLoading, TableNotFound } from "@components/ui/table";

export default function UsageTable() {
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
                  Tanggal penyesuaian
                </th>
                <th className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Kuantitas
                </th>
                <th></th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {loading ? (
                <TableLoading colSpan={4} />
              ) : isEmpty(data) || !data ? (
                <TableNotFound colSpan={4} />
              ) : (
                data.map((item, index) => {
                  return <TableItem key={`table-usage-${index}`} item={item} />;
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
