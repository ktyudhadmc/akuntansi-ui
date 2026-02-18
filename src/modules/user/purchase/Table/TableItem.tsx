// import Badge from "@components/ui/badge/Badge";
import TableItemMenu from "./TableItemMenu";
import { formatIDRLocale } from "@helpers/currency";
import { parseYMDToDate } from "@helpers/date";
import type { Purchase } from "@services/user/purchase/interfaces/response.type";
import { Link } from "react-router-dom";

interface Props {
  item: Purchase;
}

export default function TableItem({ item }: Props) {
  return (
    <tr>
      <td className="px-5 py-1 text-gray-500 text-start text-theme-xs dark:text-gray-400 whitespace-nowrap">
        {item.date}
      </td>
      <td className="px-5 py-1.5 text-gray-500 text-start text-theme-xs dark:text-gray-400 whitespace-nowrap">
        <Link to={`${item.id}`} className={`flex my-auto text-brand-600`}>
          {item.document_number}
        </Link>
      </td>
      <td className="px-5 py-1.5 text-gray-500 text-start text-theme-xs dark:text-gray-400 whitespace-nowrap">
        <Link
          to={`../contacts/${item.supplier.id}/edit?tab=supplier`}
          className={`flex my-auto text-brand-600`}
        >
          {item.supplier.name}
        </Link>
      </td>
      <td className="px-5 py-1 text-gray-500 text-start text-theme-xs dark:text-gray-400 whitespace-nowrap">
        {item.date}
      </td>
      <td className="px-4 py-1.5 text-black text-end text-theme-xs dark:text-white font-medium whitespace-nowrap">
        {formatIDRLocale(item.total_amount, { withSymbol: true })}
      </td>

      <td className="px-4 py-1  whitespace-nowrap text-gray-500 text-end text-theme-xs dark:text-gray-400">
        <TableItemMenu
          id={item.id}
          name={item.document_number}
          date={parseYMDToDate(item.date)}
        />
      </td>
    </tr>
  );
}
