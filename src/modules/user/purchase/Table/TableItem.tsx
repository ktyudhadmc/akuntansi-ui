// import Badge from "@components/ui/badge/Badge";
import TableItemMenu from "./TableItemMenu";
import { formatIDRLocale } from "@helpers/currency";
import type { Purchase } from "@services/user/purchase/interfaces/response.type";
import { Link } from "react-router-dom";

interface Props {
  item: Purchase;
}

export default function TableItem({ item }: Props) {
  return (
    <tr>
      <td className="px-5 py-1 text-gray-500 text-start text-theme-xs dark:text-gray-400">
        {item.date}
      </td>
      <td className="px-5 py-1.5 text-gray-500 text-start text-theme-xs dark:text-gray-400">
        <Link to={`${item.id}/edit`} className={`flex my-auto text-brand-600`}>
          {item.document_number}
        </Link>
      </td>
      <td className="px-5 py-1.5 text-gray-500 text-start text-theme-xs dark:text-gray-400 ">
        <Link
          to={`../contacts/${item.supplier.id}/edit?tab=supplier`}
          className={`flex my-auto text-brand-600`}
        >
          {item.supplier.name}
        </Link>
      </td>
      <td className="px-5 py-1 text-gray-500 text-start text-theme-xs dark:text-gray-400">
        {item.date}
      </td>
      <td className="px-4 py-1.5 text-black text-end text-theme-xs dark:text-white font-medium">
        {formatIDRLocale(item.total_amount, { withSymbol: true })}
      </td>

      <td className="px-4 py-1  whitespace-nowrap text-gray-500 text-start text-theme-xs dark:text-gray-400">
        <TableItemMenu id={item.id} name={item.document_number} />
      </td>
    </tr>
  );
}
