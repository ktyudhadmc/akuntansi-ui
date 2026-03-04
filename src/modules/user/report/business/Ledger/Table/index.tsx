import { isEmpty } from "lodash";

import TableItem from "./TableItem";

import { formatIDRLocale } from "@helpers/index";

import useGetAllLedger from "@services/user/report/ledger/hooks/useGetAllLedger";
import TableHeader from "./TableHeader";
import RBLedgerHeader from "../Header";
import { TableLoading, TableNotFound } from "@components/ui/table";

export default function RBLedger() {
  const { data, loading, setSearch } = useGetAllLedger();

  return (
    <>
      <RBLedgerHeader
        credit={data?.summary.credit_transaction ?? 0}
        debit={data?.summary.debit_transaction ?? 0}
        startBalance={data?.summary.opening_balance ?? 0}
        endBalance={data?.summary.closing_balance ?? 0}
        loading={loading}
      />
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <div className="space-y-6">
          <TableHeader setSearch={setSearch} />
          {/* TABLE */}
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
                    {/* <th className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Kontak
                </th> */}
                    <th className="px-5 py-3 font-medium text-gray-500 text-end text-theme-xs dark:text-gray-400">
                      Debit
                    </th>
                    <th className="px-5 py-3 font-medium text-gray-500 text-end text-theme-xs dark:text-gray-400">
                      Kredit
                    </th>
                    <th className="px-5 py-3 font-medium text-gray-500 text-end text-theme-xs dark:text-gray-400">
                      Saldo
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                  {loading ? (
                    <TableLoading colSpan={5} />
                  ) : isEmpty(data) || !data.account ? (
                    <TableNotFound colSpan={5} />
                  ) : (
                    <>
                      {data?.account.map((item, index) => {
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
                          {formatIDRLocale(0)}
                        </td>
                        <td className="px-5 py-1 text-black text-end text-theme-xs dark:text-white whitespace-nowrap font-semibold">
                          {formatIDRLocale(0)}
                        </td>
                      </tr>
                    </>
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
