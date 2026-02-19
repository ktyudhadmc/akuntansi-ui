import { formatIDRLocale } from "@helpers/currency";
import TableAction from "./TableAction";
import TableItem from "./TableItem";

export default function RBProfitLoss() {
  const dummyPendapatan = [
    { id: "1", name: "Jasa Perawatan,Perbaikan & Lainnya", code: "41-111" },
    { id: "1", name: "Jasa Perawatan,Perbaikan & Lainnya", code: "41-111" },
  ];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
      <div className="space-y-6">
        <TableAction />
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
          <div className="max-w-full overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-gray-100 dark:border-white/[0.05]">
                <tr>
                  <th
                    colSpan={2}
                    rowSpan={2}
                    className="px-5 pt-2 pb-1 font-medium text-black text-start text-sm dark:text-white font-semibold"
                  >
                    Tanggal
                  </th>

                  <th className="px-5 pt-2 pb-1 font-medium text-black text-end text-theme-xs dark:text-white font-semibold">
                    2026
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-x divide-gray-100 dark:divide-white/[0.05]">
                {/* PENDAPATAN */}
                <tr>
                  <td
                    colSpan={3}
                    className="px-5 py-1 text-black text-start text-theme-sm dark:text-white bg-gray-50 dark:bg-gray-800 font-semibold border-t border-b"
                  >
                    Pendapatan
                  </td>
                </tr>
                {dummyPendapatan.map((item, idx) => (
                  <TableItem key={`item-${idx}`} item={item} />
                ))}
                <tr>
                  <td
                    colSpan={2}
                    className="pl-10 py-1 text-black text-start text-theme-xs dark:text-white font-semibold"
                  >
                    Total dari Pendapatan
                  </td>
                  <td className="px-5 py-1 text-black text-end text-theme-xs dark:text-white whitespace-nowrap font-semibold">
                    {formatIDRLocale(0)}
                  </td>
                </tr>

                {/* BEBAN POKOK PENDAPATAN */}
                <tr>
                  <td
                    colSpan={3}
                    className="px-5 py-1 text-black text-start text-theme-sm dark:text-white bg-gray-50 dark:bg-gray-800 font-semibold border-t border-b"
                  >
                    Beban Pokok Pendapatan
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan={2}
                    className="pl-10 py-1 text-black text-start text-theme-xs dark:text-white font-semibold"
                  >
                    Total dari Beban Pokok Pendapatan
                  </td>
                  <td className="px-5 py-1 text-black text-end text-theme-xs dark:text-white whitespace-nowrap font-semibold">
                    {formatIDRLocale(0)}
                  </td>
                </tr>

                {/* BEBAN OPERASIONAL */}
                <tr>
                  <td
                    colSpan={3}
                    className="px-5 py-1 text-black text-start text-theme-sm dark:text-white bg-gray-50 dark:bg-gray-800 font-semibold border-t border-b"
                  >
                    Beban Operasional
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan={2}
                    className="pl-10 py-1 text-black text-start text-theme-xs dark:text-white font-semibold"
                  >
                    Total dari Beban Operasional
                  </td>
                  <td className="px-5 py-1 text-black text-end text-theme-xs dark:text-white whitespace-nowrap font-semibold">
                    {formatIDRLocale(0)}
                  </td>
                </tr>

                {/* PENDAPATAN (BEBAN LAIN-LAIN) */}
                <tr>
                  <td
                    colSpan={3}
                    className="px-5 py-1 text-black text-start text-theme-sm dark:text-white bg-gray-50 dark:bg-gray-800 font-semibold border-t border-b"
                  >
                    Pendapatan (beban lain-lain)
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan={2}
                    className="pl-10 py-1 text-black text-start text-theme-xs dark:text-white font-semibold"
                  >
                    Total dari Pendapatan (beban lain-lain)
                  </td>
                  <td className="px-5 py-1 text-black text-end text-theme-xs dark:text-white whitespace-nowrap font-semibold">
                    {formatIDRLocale(0)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
