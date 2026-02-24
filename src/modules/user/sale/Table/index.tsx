import { BeatLoader } from "react-spinners";
import TableHeader from "./Header";
import useGetAll from "@services/user/sale/hooks/useGetAll";
import { isEmpty } from "lodash";
import TableItem from "./TableItem";
import SaleHeader from "../Header";

export default function SaleTable() {
  const { data, loading, setName } = useGetAll();

  return (
    <>
      {/* header */}
      <SaleHeader
        loading={loading}
        grossRevenue={data?.summary.total_net ?? 0}
        taxAmount={data?.summary.total_tax ?? 0}
        revenueIncludingTax={data?.summary.total_net ?? 0}
      />
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <div className="space-y-6">
          <TableHeader setSearchCallback={setName} />
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
            <div className="max-w-full overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-gray-100 dark:border-white/[0.05]">
                  <tr>
                    <th className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 whitespace-nowrap">
                      Tanggal
                    </th>
                    <th className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 whitespace-nowrap">
                      Nomor
                    </th>
                    <th className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 whitespace-nowrap">
                      Pelanggan
                    </th>
                    <th className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 whitespace-nowrap">
                      Jenis layanan
                    </th>
                    <th className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 whitespace-nowrap">
                      Produk
                    </th>
                    <th className="px-5 py-3 font-medium text-gray-500 text-end text-theme-xs dark:text-gray-400 whitespace-nowrap">
                      Total Harga
                    </th>
                    <th></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                  {loading ? (
                    <tr>
                      <td colSpan={6} className="text-center py-16">
                        <div className="sweet-loading">
                          <BeatLoader color="var(--color-brand-600)" />
                        </div>
                      </td>
                    </tr>
                  ) : isEmpty(data) || !data.sales ? (
                    <tr>
                      <td colSpan={6} className="text-center py-4">
                        Data tidak tersedia
                      </td>
                    </tr>
                  ) : (
                    data.sales.map((item, index) => {
                      return (
                        <TableItem key={`table-sale-${index}`} item={item} />
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
