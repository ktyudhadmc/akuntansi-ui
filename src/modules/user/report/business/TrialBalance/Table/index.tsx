import TableAction from "./TableAction";
import TableItem from "./TableItem";

import { formatIDRLocale } from "@helpers/currency";

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableLoading,
  TableNotFound,
  TableRow,
} from "@components/ui/table";
import useGetAllTrialBalance from "@services/user/report/trial-balance/hooks/useGetAllTrialBalance";
import { isEmpty } from "lodash";

export default function RBTrialBalance() {
  const { data, loading, setSearch } = useGetAllTrialBalance();
  return (
    <>
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <div className="space-y-6">
          <TableAction setSearch={(e) => setSearch(e)} />

          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
            <div className="max-w-full overflow-x-auto">
              <Table className="w-full">
                <TableHeader className="px-6 py-3.5 border-t border-gray-100 border-y bg-gray-50 dark:border-white/[0.05] dark:bg-white/[0.05]">
                  <TableRow>
                    <TableCell
                      colSpan={2}
                      rowSpan={2}
                      isHeader
                      className="border-r align-middle dark:border-white/[0.10]"
                    >
                      Daftar Akun
                    </TableCell>
                    <TableCell
                      colSpan={2}
                      isHeader
                      className="border-r border-b dark:border-white/[0.10]"
                    >
                      Saldo Awal
                    </TableCell>
                    <TableCell
                      colSpan={2}
                      isHeader
                      className="border-r border-b dark:border-white/[0.10]"
                    >
                      Pergerakan
                    </TableCell>
                    <TableCell
                      colSpan={2}
                      isHeader
                      className="border-r border-b dark:border-white/[0.10]"
                    >
                      Saldo Akhir
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      isHeader
                      className="text-center border-r dark:border-white/[0.10]"
                    >
                      Debit
                    </TableCell>
                    <TableCell
                      isHeader
                      className="text-center border-r dark:border-white/[0.10]"
                    >
                      Kredit
                    </TableCell>
                    <TableCell
                      isHeader
                      className="text-center border-r dark:border-white/[0.10]"
                    >
                      Debit
                    </TableCell>
                    <TableCell
                      isHeader
                      className="text-center border-r dark:border-white/[0.10]"
                    >
                      Kredit
                    </TableCell>
                    <TableCell
                      isHeader
                      className="text-center border-r dark:border-white/[0.10]"
                    >
                      Debit
                    </TableCell>
                    <TableCell
                      isHeader
                      className="text-center border-r dark:border-white/[0.10]"
                    >
                      Kredit
                    </TableCell>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {loading ? (
                    <TableLoading colSpan={8} />
                  ) : isEmpty(data) || !data ? (
                    <TableNotFound colSpan={8} />
                  ) : (
                    data?.accounts.map((item, index) => {
                      return (
                        <TableItem
                          key={`table-item-trial-balance-${index}`}
                          item={item}
                        />
                      );
                    })
                  )}
                </TableBody>

                {data?.total && (
                  <tfoot className="border-t dark:border-white/[0.10]">
                    <tr>
                      <td
                        colSpan={2}
                        className="pl-5 py-1 text-black text-start text-theme-xs dark:text-white whitespace-nowrap font-semibold"
                      >
                        Total
                      </td>

                      <td className="px-5 py-1 text-black text-end text-theme-xs dark:text-white whitespace-nowrap">
                        {formatIDRLocale(data.total.opening_balance.debit)}
                      </td>
                      <td className="px-5 py-1 text-black text-end text-theme-xs dark:text-white whitespace-nowrap">
                        {formatIDRLocale(data.total.opening_balance.credit)}
                      </td>
                      <td className="px-5 py-1 text-black text-end text-theme-xs dark:text-white whitespace-nowrap">
                        {formatIDRLocale(data.total.movement_balance.debit)}
                      </td>
                      <td className="px-5 py-1 text-black text-end text-theme-xs dark:text-white whitespace-nowrap">
                        {formatIDRLocale(data.total.movement_balance.credit)}
                      </td>
                      <td className="px-5 py-1 text-black text-end text-theme-xs dark:text-white whitespace-nowrap">
                        {formatIDRLocale(data.total.closing_balance.debit)}
                      </td>
                      <td className="px-5 py-1 text-black text-end text-theme-xs dark:text-white whitespace-nowrap">
                        {formatIDRLocale(data.total.closing_balance.credit)}
                      </td>
                    </tr>
                  </tfoot>
                )}
              </Table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
