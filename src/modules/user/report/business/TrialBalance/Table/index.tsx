import { isEmpty } from "lodash";

import TableAction from "./TableAction";
import TableItem from "./TableItem";

// import { formatIDRLocale } from "@helpers/currency";

import {
  Table,
  TableBody,
  TableCell,
  TableFoot,
  TableHeader,
  TableLoading,
  TableNotFound,
  TableRow,
  TableWrapper,
} from "@components/ui/table";
import useGetAllTrialBalance from "@services/user/report/trial-balance/hooks/useGetAllTrialBalance";

export default function RBTrialBalance() {
  const { data, loading } = useGetAllTrialBalance();
  return (
    <>
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <div className="space-y-6">
          <TableAction />

          <TableWrapper isSticky>
            <Table className="w-full">
              <TableHeader isSticky>
                <TableRow className="pointer-events-none">
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
                <TableRow className="pointer-events-none">
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
                  data?.map((item, index) => {
                    return (
                      <TableItem
                        key={`table-item-trial-balance-${index}`}
                        item={item}
                      />
                    );
                  })
                )}
              </TableBody>

              <TableFoot
                isSticky
                className="border-t dark:!border-white/[0.10]"
              >
                <tr>
                  <td
                    colSpan={2}
                    className="pl-5 py-1 text-black text-start text-theme-sm dark:text-white whitespace-nowrap font-semibold"
                  >
                    Total
                  </td>

                  <td className="px-5 py-1 text-black text-end text-theme-xs dark:text-white whitespace-nowrap">
                    0
                    {/* {formatIDRLocale(data?.total.opening_balance.debit ?? 0)} */}
                  </td>
                  <td className="px-5 py-1 text-black text-end text-theme-xs dark:text-white whitespace-nowrap">
                    0
                    {/* {formatIDRLocale(data?.total.opening_balance.credit ?? 0)} */}
                  </td>
                  <td className="px-5 py-1 text-black text-end text-theme-xs dark:text-white whitespace-nowrap">
                    0
                    {/* {formatIDRLocale(data?.total.movement_balance.debit ?? 0)} */}
                  </td>
                  <td className="px-5 py-1 text-black text-end text-theme-xs dark:text-white whitespace-nowrap">
                    0
                    {/* {formatIDRLocale(
                        data?.total.movement_balance.credit ?? 0,
                      )} */}
                  </td>
                  <td className="px-5 py-1 text-black text-end text-theme-xs dark:text-white whitespace-nowrap">
                    0
                    {/* {formatIDRLocale(data?.total.closing_balance.debit ?? 0)} */}
                  </td>
                  <td className="px-5 py-1 text-black text-end text-theme-xs dark:text-white whitespace-nowrap">
                    0
                    {/* {formatIDRLocale(data?.total.closing_balance.credit ?? 0)} */}
                  </td>
                </tr>
              </TableFoot>
            </Table>
          </TableWrapper>
        </div>
      </div>
    </>
  );
}
