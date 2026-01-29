import Button from "@components/ui/button/Button";

import type { Account } from "@services/user/account/interfaces/response.type";
import { formattedCurrency } from "@helpers/currency";

import TableItemMenu from "./TableItemMenu";

interface Props {
  item: Account;
}

export default function TableItem({ item }: Props) {
  return (
    <tr>
      {/* <td className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
        {nomor}
      </td> */}
      <td className="px-5 py-3 text-gray-500 text-start text-theme-xs dark:text-gray-400 whitespace-nowrap">
        {item.code}
      </td>
      <td className="px-4 py-3 text-gray-500 text-start text-theme-xs dark:text-gray-400 ">
        <div className="flex md:flex-row flex-col justify-between gap-2">
          <span className="my-auto">{item.name}</span>
          <Button variant="outline" size="xs" className="whitespace-nowrap">
            Hubungkan ke bank
          </Button>
        </div>
      </td>
      <td className="px-4 py-3  whitespace-nowrap text-gray-500 text-start text-theme-xs dark:text-gray-400">
        {formattedCurrency(0)}
      </td>
      <td className="px-4 py-3  whitespace-nowrap text-gray-500 text-start text-theme-xs dark:text-gray-400">
        {formattedCurrency(0)}
      </td>
      <td className="px-4 py-3  whitespace-nowrap text-gray-500 text-start text-theme-xs dark:text-gray-400">
        <TableItemMenu id={item.id} name={item.name} code={item.code} />
      </td>
    </tr>
  );
}
