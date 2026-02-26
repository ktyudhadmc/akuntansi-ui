import { useParams } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { isEmpty } from "lodash";

import TableItem from "./TableItem";
import TableHeader from "./TableHeader";

import useGetLedgerByAccount from "@services/user/report/ledger/hooks/useGetLedgerByAccount";
import { formatIDRLocale } from "@helpers/currency";

export default function CBShowJournalTable() {
  const params = useParams();

  const {
    data: ledgers,
    loading: ledgerLoading,
    setSearch,
  } = useGetLedgerByAccount(params.id as string);

  return (
    <>
      {/* TABLE HEADER */}
      <TableHeader setSearch={setSearch} />

      {/* TABLE */}
      <div className="overflow-auto sm:rounded-lg max-h-[calc(100vh-35vh)] rounded-2xl border border-gray-100 dark:border-gray-800 custom-scrollbar">
        <table className="w-full">
          {/* Table Header */}
          <thead className="sticky top-0 z-10 border-b border-gray-100 dark:border-white/[0.05]  bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Tanggal
              </th>
              <th className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Nomor
              </th>
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

            <tr className="bg-gray-50 dark:bg-white/[0.02] border-b border-gray-100">
              <td
                className="px-5 py-2 text-theme-sm text-black dark:text-white"
                colSpan={2}
              >
                Saldo Awal
              </td>
              <td className="px-5 py-2 text-end text-theme-xs text-gray-400">
                -
              </td>
              <td className="px-5 py-2 text-end text-theme-xs text-gray-400">
                -
              </td>
              <td className="px-5 py-2 text-end text-theme-xs font-semibold text-black dark:text-white">
                {formatIDRLocale(ledgers?.balance.opening_balance ?? 0)}
              </td>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {ledgerLoading ? (
              <tr>
                <td colSpan={5} className="text-center py-16">
                  <div className="sweet-loading">
                    <BeatLoader color="var(--color-brand-600)" />
                  </div>
                </td>
              </tr>
            ) : isEmpty(ledgers?.mutation) || !ledgers?.mutation ? (
              <tr>
                <td colSpan={5} className="text-center py-4">
                  Data tidak tersedia
                </td>
              </tr>
            ) : (
              <>
                {ledgers.mutation.map((item, index) => {
                  return (
                    <TableItem key={`table-account-${index}`} item={item} />
                  );
                })}
              </>
            )}
          </tbody>

          <tfoot className="sticky bottom-0 z-10">
            <tr className="bg-gray-50 dark:bg-white/[0.02]">
              <td
                className="px-5 py-2 text-theme-sm text-black dark:text-white"
                colSpan={2}
              >
                Saldo Akhir
              </td>
              <td className="px-5 py-2 text-end text-theme-xs text-gray-400">
                -
              </td>
              <td className="px-5 py-2 text-end text-theme-xs text-gray-400">
                -
              </td>
              <td className="px-5 py-2 text-end text-theme-sm text-black dark:text-white">
                {formatIDRLocale(ledgers?.balance.closing_balance ?? 0)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
}
