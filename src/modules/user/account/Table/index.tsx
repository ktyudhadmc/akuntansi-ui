import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@components/ui/table";

import type { Account } from "@services/user/account/interfaces/response.type";
import TableItem from "./TableItem";

// Define the table data using the interface
const data: Account[] = [
  {
    id: 1,
    code: "10-000",
    name: "AKTIVA",
  },
];

export default function AccountTable() {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Table Header */}
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <tr>
              <th className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Kode akun
              </th>
              <th className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Nama akun
              </th>
              <th className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Saldo bank
              </th>
              <th className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Saldo di jurnal
              </th>
              <th></th>
            </tr>
          </TableHeader>

          <tbody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {data.map((item, index) => (
              <TableItem
                key={`table-account-${index}`}
                nomor={++index}
                item={item}
              />
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
