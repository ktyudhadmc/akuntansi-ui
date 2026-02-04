import { useParams } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { isEmpty } from "lodash";

import TableItem from "./TableItem";
import TableHeader from "./TableHeader";

import useGetAllBankStatement from "@services/user/account/cash-bank/hooks/useGetAllBankStatement";

export default function CBBankStatementTable() {
  const params = useParams();

  const {
    data: ledgers,
    loading: ledgerLoading,
    startDate,
    endDate,
    setSearch,
    setStartDate,
    setEndDate,
  } = useGetAllBankStatement(params.id as string);

  return (
    <>
      {/* TABLE HEADER */}
      <TableHeader
        setSearch={setSearch}
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />

      {/* TABLE */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full">
            {/* Table Header */}
            <thead className="border-b border-gray-100 dark:border-white/[0.05]">
              <tr>
                <th className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Tanggal
                </th>
                <th className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Deskripsi
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
                <th className="px-5 py-3 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400">
                  Sumber
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {ledgerLoading ? (
                <tr>
                  <td colSpan={6} className="text-center py-16">
                    <div className="sweet-loading">
                      <BeatLoader color="var(--color-brand-600)" />
                    </div>
                  </td>
                </tr>
              ) : isEmpty(ledgers?.mutations) || !ledgers?.mutations ? (
                <tr>
                  <td colSpan={6} className="text-center py-4">
                    Data tidak tersedia
                  </td>
                </tr>
              ) : (
                ledgers.mutations.map((item, index) => {
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
