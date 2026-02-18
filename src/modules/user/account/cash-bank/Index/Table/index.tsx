import TableItem from "./TableItem";
import TableAction from "./Header";

import { isEmpty } from "lodash";
import useGetAllCashBank from "@services/user/account/cash-bank/hooks/useGetAllCashBank";
import { Table, TableBody, TableCell, TableHeader, TableLoading, TableNotFound, TableRow } from "@components/ui/table";

export default function AccountTable() {
  const { data, loading, setName } = useGetAllCashBank();

  return (
    <>
      <TableAction setSearchCallback={(e) => setName(e)} />
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <Table>
            {/* Table Header */}
            <TableHeader>
              <TableRow>
                <TableCell isHeader className="text-start whitespace-nowrap">
                  Kode akun
                </TableCell>
                < TableCell isHeader className="text-start whitespace-nowrap">
                  Nama akun
                </TableCell>
                <TableCell isHeader className="text-end whitespace-nowrap">
                  Saldo bank
                </TableCell>
                <TableCell isHeader className="text-end whitespace-nowrap">
                  Saldo di jurnal
                </TableCell>
                <th></th>
              </TableRow>
            </TableHeader>

            <TableBody>
              {loading ? (
                <TableLoading colSpan={5} />
              ) : isEmpty(data) || !data ? (
                <TableNotFound colSpan={5} />
              ) : (
                <>
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="text-start px-5 py-3 font-semibold text-theme-xs  dark:text-white"
                    >
                      Kas & Bank
                    </TableCell>
                  </TableRow>
                  {data.map((item, index) => {
                    return (
                      <TableItem key={`table-account-${index}`} item={item} />
                    );
                  })}
                </>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}
