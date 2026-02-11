// import Badge from "@components/ui/badge/Badge";
import { Link } from "react-router-dom";

import TableItemMenu from "./TableItemMenu";
import { formatIDRLocale } from "@helpers/currency";
import type { Sale } from "@services/user/sale/interfaces/response.type";

interface Props {
  item: Sale;
}

export default function TableItem({ item }: Props) {
  return (
    <tr>
      <td className="px-5 py-1 text-gray-500 text-start text-theme-xs dark:text-gray-400 whitespace-nowrap">
        {item.date}
      </td>
      <td className="px-5 py-1.5 text-gray-500 text-start text-theme-xs dark:text-gray-400 whitespace-nowrap">
        <Link to={`${item.id}/edit`} className={`flex my-auto text-brand-600`}>
          {item.document_number}
        </Link>
      </td>
      <td className="px-5 py-1.5 text-gray-500 text-start text-theme-xs dark:text-gray-400 whitespace-nowrap">
        <Link
          to={`../contacts/${item.customer.id}/edit?tab=supplier`}
          className={`flex my-auto text-brand-600`}
        >
          {item.customer.name}
        </Link>
      </td>
      <td className="px-5 py-1 text-gray-500 text-start text-theme-xs dark:text-gray-400 whitespace-nowrap">
        {item.date}
      </td>
      <td className="px-4 py-1.5 text-black text-end text-theme-xs dark:text-white font-medium">
        {formatIDRLocale(item.total_gross, { withSymbol: true })}
      </td>

      <td className="px-4 py-1  whitespace-nowrap text-gray-500 text-end text-theme-xs dark:text-gray-400">
        <TableItemMenu id={item.id} invoice={item.document_number} />
      </td>
    </tr>
  );
}
