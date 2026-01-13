import Button from "@components/ui/button/Button";

import type { Account } from "@services/user/account/interfaces/response.type";
import { formattedCurrency } from "@helpers/currency";

import TableItemMenu from "./TableItemMenu";

interface Props {
  nomor: number;
  item: Account;
}

export default function TableItem({ nomor, item }: Props) {
  return (
    <tr>
      <td className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
        {nomor}
      </td>
      <td className="px-5 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
        {item.code}
      </td>
      <td className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
        <div className="w-full flex whitespace-nowrap gap-4 justify-between my-auto">
          <p className="my-auto"> {item.name}</p>
          <div>
            <Button variant="outline" size="sm">
              Hubungkan ke bank
            </Button>
          </div>
        </div>
      </td>
      <td className="px-4 py-3  whitespace-nowrap text-gray-500 text-start text-theme-sm dark:text-gray-400">
        {formattedCurrency(0)}
      </td>
      <td className="px-4 py-3  whitespace-nowrap text-gray-500 text-start text-theme-sm dark:text-gray-400">
        {formattedCurrency(0)}
      </td>
      <td>
        <TableItemMenu id={item.id} name={item.name} code={item.code} />
      </td>
    </tr>
  );
}
