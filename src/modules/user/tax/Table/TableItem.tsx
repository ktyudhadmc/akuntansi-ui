import type { Tax } from "@services/user/tax/interfaces/response.type";
import { Link } from "react-router-dom";
import TableItemMenu from "./TableItemMenu";

interface Props {
  item: Tax;
}

export default function TableItem({ item }: Props) {
  return (
    <tr>
      <td className="px-5 py-1 text-black text-start text-theme-sm dark:text-white font-semibold">
        {item.name}
      </td>
      <td className="px-5 py-1 text-gray-500 text-end text-theme-sm dark:text-gray-400">
        {item.rate}
      </td>
      <td className="px-5 py-1 text-gray-500 text-start text-sm dark:text-gray-400 ">
        <Link
          to={`/user/accounts/chart-of-account/${item.id}`}
          className="cursor-pointer text-brand-400 dark:text-gray-400 flex gap-2"
        >
          <span>({item.purchase_account.code})</span>
          <span>{item.purchase_account.name}</span>
        </Link>
      </td>
      <td className="px-5 py-1 text-gray-500 text-start text-sm dark:text-gray-400 ">
        <Link
          to={`/user/accounts/chart-of-account/${item.id}`}
          className="cursor-pointer text-brand-400 dark:text-gray-400 flex gap-2"
        >
          <span>({item.sales_account.code})</span>
          <span>{item.sales_account.name}</span>
        </Link>
      </td>
      <td className="px-5 py-1 text-gray-500 text-end text-theme-sm dark:text-gray-400">
        <TableItemMenu id={item.id} name={item.name} />
      </td>
    </tr>
  );
}
