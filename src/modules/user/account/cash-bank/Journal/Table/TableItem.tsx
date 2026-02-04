import { formatIDRLocale } from "@helpers/currency";
import type { Ledger } from "@services/user/report/ledger/interfaces/response.type";
import { Link } from "react-router-dom";

interface Props {
  item: Ledger;
}

export default function TableItem({ item }: Props) {
  const getTransactionUrl = (id: string, type: string) => {
    switch (type) {
      case "sales":
        return `/user/sales/${id}/edit`;
      case "purchase":
        return `/user/purchases/${id}/edit`;
      case "journal":
        return `/user/journals/${id}/edit`;
      default:
        return "#";
    }
  };

  return (
    <tr>
      <td className="px-5 py-1 text-gray-500 text-start text-theme-xs dark:text-gray-400">
        {item.date}
      </td>
      <td className="px-5 py-1 text-gray-500 text-start text-sm dark:text-gray-400 ">
        <Link
          to={getTransactionUrl(item.transaction.id, item.transaction.type)}
          className="cursor-pointer text-brand-400 dark:text-gray-400"
        >
          ({item.transaction.document_number ?? "-"})
        </Link>
        <br />
        <small className="italic">{item.description}</small>
      </td>
      <td className="px-5 py-1 text-black text-end text-theme-xs dark:text-white whitespace-nowrap font-semibold">
        {formatIDRLocale(item.debit)}
      </td>
      <td className="px-5 py-1 text-black text-end text-theme-xs dark:text-white whitespace-nowrap font-semibold">
        {formatIDRLocale(item.credit)}
      </td>
      <td className="px-5 py-1 text-black text-end text-theme-xs dark:text-white whitespace-nowrap font-semibold">
        {formatIDRLocale(item.balance)}
      </td>
    </tr>
  );
}
