import type { Account } from "@services/user/account/index/interfaces/response.type";
import { formatIDR } from "@helpers/currency";

import TableItemMenu from "./TableItemMenu";
import { AiOutlineDash, AiOutlineLock } from "react-icons/ai";
import { Link } from "react-router-dom";

interface Props {
  item: Account;
}

export default function TableItem({ item }: Props) {
  const indentClasses: Record<number, string> = {
    0: "pl-4 pr-4",
    1: "pl-8 pr-4",
    2: "pl-12 pr-4",
    3: "pl-16 pr-4",
    4: "px-20 pr-4",
  };

  const paddingClass = indentClasses[item.level] || "px-4";
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
      <td className="text-brand-600 dark:text-white text-start text-theme-xs font-medium ">
        <Link
          to={`${item.id}`}
          // target="_blank"
          // rel="noopener noreferrer"
          className={`flex py-1 ${paddingClass}`}
        >
          {item.name}
        </Link>
      </td>
      <td className="px-4 py-1  whitespace-nowrap text-gray-500 text-end text-theme-xs dark:text-gray-400">
        {formatIDR(0)}
      </td>
      <td className="px-4 py-1  whitespace-nowrap text-gray-500 text-end text-theme-xs dark:text-gray-400">
        {formatIDR(0)}
      </td>
      <td className="px-4 py-1  whitespace-nowrap text-gray-500 text-end text-theme-xs dark:text-gray-400">
        <TableItemMenu
          id={item.id}
          name={item.name}
          code={item.code}
          isLock={!item.is_posting}
        />
      </td>
    </tr>
  );
}
