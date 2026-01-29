import { formatIDR } from "@helpers/currency";

import TableItemMenu from "./TableItemMenu";
import type { GeneralJournal } from "@services/user/journal/general/interfaces/response.type";

interface Props {
  item: GeneralJournal;
}

export default function TableItem({ item }: Props) {
  return (
    <tr className="hover:bg-gray-50 hover:dark:bg-gray-800">
      <td className="px-5 py-1 text-gray-500 text-start text-theme-xs dark:text-gray-400 whitespace-nowrap">
        {item.date}
      </td>
      <td className="px-5 py-1 text-gray-500 text-start text-theme-xs dark:text-gray-400 whitespace-nowrap font-semibold">
        {item.document_number}
      </td>
      <td className="px-5 py-1 text-gray-500 text-start text-theme-xs dark:text-gray-400 whitespace-nowrap font-semibold">
        {item.reff}
      </td>
      <td className="px-5 py-1 text-gray-500 text-start text-theme-xs dark:text-gray-400 whitespace-nowrap font-semibold">
        {formatIDR(item.amount)}
      </td>
      <td className="px-5 py-1 text-gray-500 text-start text-theme-xs dark:text-gray-400 ">
        <span className="font-semibold">{item.account.code}</span>
        <p className="text-theme-xs">{item.account.name}</p>
      </td>
      <td className="px-5 py-1 text-gray-500 text-start text-theme-xs dark:text-gray-400 ">
        <span className="font-semibold">{item.counter_account?.code}</span>
        <p className="text-theme-xs">{item.counter_account?.name}</p>
      </td>
      <td className="px-4 py-1  whitespace-nowrap text-gray-500 text-start text-theme-xs dark:text-gray-400">
        {item.description}
      </td>
      <td className="px-4 py-1  whitespace-nowrap text-gray-500 text-start text-theme-xs dark:text-gray-400">
        {item.remarks}
      </td>
      <td className="px-4 py-1  whitespace-nowrap text-gray-500 text-start text-theme-xs dark:text-gray-400">
        <TableItemMenu id={item.id} name={item.description} />
      </td>
    </tr>
  );
}
