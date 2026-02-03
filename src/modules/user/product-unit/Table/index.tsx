import { BeatLoader } from "react-spinners";
import { isEmpty } from "lodash";

import TableItem from "./TableItem";
import TableHeader from "./TableHeader";
import useGetAll from "@services/user/product/unit/hooks/useGetAll";

export default function ProductUnitTable() {
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
                  Nama
                </th>
                <th></th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {loading ? (
                <tr>
                  <td colSpan={2} className="text-center py-16">
                    <div className="sweet-loading">
                      <BeatLoader color="var(--color-brand-600)" />
                    </div>
                  </td>
                </tr>
              ) : isEmpty(data) || !data ? (
                <tr>
                  <td colSpan={2} className="text-center py-4">
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
    </>
  );
}
