import { isEmpty } from "lodash";
import { BeatLoader } from "react-spinners";

import TableItem from "./TableItem";

import { formatIDRLocale, sumNested } from "@helpers/index";

// import useGetAllLedgerAccount from "@services/user/report/ledger/hooks/useGetAllLedgerAccount";
import useGetAllLedger from "@services/user/report/ledger/hooks/useGetAllLedger";
import TableHeader from "./TableHeader";
import RBLedgerHeader from "../Header";

export default function RBLedger() {
  // const { data, loading } = useGetAllLedgerAccount();
  const { data, loading, setSearch } = useGetAllLedger();

  const grandTotalCredit = sumNested(
    data,
    (i) => i.children,
    (c) => c.credit,
  );

  const grandTotalDebit = sumNested(
    data,
    (i) => i.children,
    (c) => c.debit,
  );
  const grandTotalBalance = sumNested(
    data,
    (i) => i.children,
    (c) => c.balance,
  );
  const grandTotalOpenBalance = sumNested(
    data,
    (i) => i.children,
    (c) => c.opening_balance,
  );

  return (
    <>
      <RBLedgerHeader
        credit={grandTotalCredit}
        debit={grandTotalDebit}
        startBalance={grandTotalBalance}
        endBalance={grandTotalOpenBalance}
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
