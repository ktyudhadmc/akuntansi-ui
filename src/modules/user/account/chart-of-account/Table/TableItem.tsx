import type { Account } from "@services/user/account/interfaces/response.type";
import { formattedCurrency } from "@helpers/currency";

import TableItemMenu from "./TableItemMenu";
import { AiOutlineDash, AiOutlineLock } from "react-icons/ai";
import { Link } from "react-router-dom";

interface Props {
  item: Account;
}

export default function TableItem({ item }: Props) {
  return (
    <tr className="hover:bg-gray-50 hover:dark:bg-gray-800">
      {/* <td className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
        {nomor}
      </td> */}
      <td className="px-5 py-1 text-gray-500 text-center text-base dark:text-gray-400 whitespace-nowrap">
        {item.is_posting ? <AiOutlineLock /> : <AiOutlineDash />}
      </td>
      <td className="px-5 py-1 text-gray-500 text-start text-theme-xs dark:text-gray-400 whitespace-nowrap">
        {item.code}
      </td>
      <td className=" text-brand-600 dark:text-white text-start text-theme-xs font-medium ">
        <Link
          to={`${item.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex px-4 py-1"
        >
          {item.name}
        </Link>
      </td>
      <td className="px-4 py-1  whitespace-nowrap text-gray-500 text-start text-theme-xs dark:text-gray-400">
        {formattedCurrency(0)}
      </td>
      <td className="px-4 py-1  whitespace-nowrap text-gray-500 text-start text-theme-xs dark:text-gray-400">
        {formattedCurrency(0)}
      </td>
      <td className="px-4 py-1  whitespace-nowrap text-gray-500 text-start text-theme-xs dark:text-gray-400">
        <TableItemMenu
          id={item.id}
          name={item.name}
          code={item.code}
          isLock={item.is_posting}
        />
      </td>
    </tr>
  );
}
