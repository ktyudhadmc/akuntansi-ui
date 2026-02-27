import { isEmpty } from "lodash";

import TableItem from "./TableItem";
import TableHeader from "./TableHeader";
import useGetAll from "@services/user/production/hooks/useGetAll";
import { TableLoading, TableNotFound } from "@components/ui/table";

export default function ProductionTable() {
  const { data, loading, setName } = useGetAll();

  return (
    <>
      <TableHeader setSearchCallback={setName} />
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-100 dark:border-white/[0.05]">
              <tr>
                <th className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Tanggal produksi
                </th>
                <th className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Deskripsi
                </th>
                <th className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Produk
                </th>
                {/* <th className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Material
                </th> */}
                <th></th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {loading ? (
                <TableLoading colSpan={4} />
              ) : isEmpty(data) || !data ? (
                <TableNotFound colSpan={4} />
              ) : (
                data?.map((item, index) => {
                  return (
                    <TableItem key={`table-production-${index}`} item={item} />
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
