// import { BeatLoader } from "react-spinners";
import TableHeader from "./TableHeader";
import { formatIDRLocale } from "@helpers/currency";
import TableItem from "./TableItem";

export default function RBTrialBalance() {
  return (
    <>
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <div className="space-y-6">
          <TableHeader setSearch={(e) => console.log(e)} />

          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
            <div className="max-w-full overflow-x-auto">
              <table className="w-full">
                <thead className="px-6 py-3.5 border-t border-gray-100 border-y bg-gray-50 dark:border-white/[0.05] dark:bg-white/[0.05]">
                  <tr>
                    <th
                      colSpan={2}
                      rowSpan={2}
                      className="pl-5 pt-2 pb-1 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 border-r align-middle dark:border-white/[0.10]"
                    >
                      Daftar Akun
                    </th>
                    <th
                      colSpan={2}
                      className="px-5 pt-2 pb-1 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400 border-r border-b dark:border-white/[0.10]"
                    >
                      Saldo Awal
                    </th>
                    <th
                      colSpan={2}
                      className="px-5 pt-2 pb-1 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400 border-r border-b dark:border-white/[0.10]"
                    >
                      Pergerakan
                    </th>
                    <th
                      colSpan={2}
                      className="px-5 pt-2 pb-1 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400 border-r border-b dark:border-white/[0.10]"
                    >
                      Saldo Akhir
                    </th>
                  </tr>
                  <tr>
                    <th className="px-5 pb-2 pt-1 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400 border-r dark:border-white/[0.10]">
                      Debit
                    </th>
                    <th className="px-5 pb-2 pt-1 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400 border-r dark:border-white/[0.10]">
                      Kredit
                    </th>
                    <th className="px-5 pb-2 pt-1 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400  border-r dark:border-white/[0.10]">
                      Debit
                    </th>
                    <th className="px-5 pb-2 pt-1 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400  border-r dark:border-white/[0.10]">
                      Kredit
                    </th>
                    <th className="px-5 pb-2 pt-1 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400  border-r dark:border-white/[0.10]">
                      Debit
                    </th>
                    <th className="px-5 pb-2 pt-1 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400  border-r dark:border-white/[0.10]">
                      Kredit
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-x divide-gray-100 dark:divide-white/[0.05]">
                  {/* <tr>
                    <td colSpan={8} className="text-center py-16">
                      <div className="sweet-loading">
                        <BeatLoader color="var(--color-brand-600)" />
                      </div>
                    </td>
                  </tr> */}
                  {Array.from({ length: 6 }).map((_, index) => {
                    const number = ++index;
                    return (
                      <TableItem
                        key={`table-item-trial-balance-${index}`}
                        nomor={number}
                      />
                    );
                  })}

                  {/* {loading ? (
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
                    <>
                      {data.map((item, index) => {
                        return (
                          <TableItem
                            key={`table-account-${index}`}
                            item={item}
                          />
                        );
                      })}

                      <tr>
                        <td
                          colSpan={2}
                          className="px-5 py-1 text-black text-end text-theme-xs dark:text-white font-semibold"
                        >
                          Total Keseluruhan
                        </td>
                        <td className="px-5 py-1 text-black text-end text-theme-xs dark:text-white whitespace-nowrap font-semibold">
                          {formatIDRLocale(grandTotalDebit)}
                        </td>
                        <td className="px-5 py-1 text-black text-end text-theme-xs dark:text-white whitespace-nowrap font-semibold">
                          {formatIDRLocale(grandTotalCredit)}
                        </td>
                      </tr>
                    </>
                  )} */}
                </tbody>
                <tfoot className="border-t dark:border-white/[0.10]">
                  <tr>
                    <td
                      colSpan={2}
                      className="pl-5 py-1 text-black text-start text-theme-xs dark:text-white whitespace-nowrap font-semibold"
                    >
                      Total
                    </td>

                    <td className="px-5 py-1 text-black text-end text-theme-xs dark:text-white whitespace-nowrap">
                      {formatIDRLocale(100)}
                    </td>
                    <td className="px-5 py-1 text-black text-end text-theme-xs dark:text-white whitespace-nowrap">
                      {formatIDRLocale(100)}
                    </td>
                    <td className="px-5 py-1 text-black text-end text-theme-xs dark:text-white whitespace-nowrap">
                      {formatIDRLocale(100)}
                    </td>
                    <td className="px-5 py-1 text-black text-end text-theme-xs dark:text-white whitespace-nowrap">
                      {formatIDRLocale(100)}
                    </td>
                    <td className="px-5 py-1 text-black text-end text-theme-xs dark:text-white whitespace-nowrap">
                      {formatIDRLocale(100)}
                    </td>
                    <td className="px-5 py-1 text-black text-end text-theme-xs dark:text-white whitespace-nowrap">
                      {formatIDRLocale(100)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
