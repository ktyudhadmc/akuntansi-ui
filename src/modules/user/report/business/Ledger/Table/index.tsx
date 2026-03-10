import { isEmpty } from "lodash";

import TableItem from "./TableItem";

import { formatIDRLocale } from "@helpers/index";

import useGetAllLedger from "@services/user/report/ledger/hooks/useGetAllLedger";
import TableFilter from "./TableFilter";
import RBLedgerHeader from "../Header";
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
          <TableFilter setSearch={setSearch} />
          {/* TABLE */}
          <TableWrapper isSticky>
            <Table>
              <TableHeader isSticky>
                <TableRow>
                  <TableCell isHeader>Tanggal</TableCell>
                  <TableCell isHeader>Nomor</TableCell>
                  {/* <th className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Kontak
                </th> */}
                  <TableCell isHeader className="text-end">
                    Debit
                  </TableCell>
                  <TableCell isHeader className="text-end">
                    Kredit
                  </TableCell>
                  <TableCell isHeader className="text-end">
                    Saldo
                  </TableCell>
                </TableRow>
              </TableHeader>

              <TableBody>
                {loading ? (
                  <TableLoading colSpan={5} />
                ) : isEmpty(data) || !data.account ? (
                  <TableNotFound colSpan={5} />
                ) : (
                  <>
                    {data?.account.map((item, index) => {
                      return (
                        <TableItem key={`table-account-${index}`} item={item} />
                      );
                    })}
                  </>
                )}
              </TableBody>
              <TableFoot isSticky>
                <TableRow>
                  <TableCell isHeader colSpan={2} className="text-end">
                    Total Keseluruhan
                  </TableCell>
                  <TableCell isHeader className="text-end">
                    {formatIDRLocale(0)}
                  </TableCell>
                  <TableCell isHeader className="text-end">
                    {formatIDRLocale(0)}
                  </TableCell>
                  <TableCell isHeader className="text-end">
                    {formatIDRLocale(0)}
                  </TableCell>
                </TableRow>
              </TableFoot>
            </Table>
          </TableWrapper>
        </div>
      </div>
    </>
  );
}
