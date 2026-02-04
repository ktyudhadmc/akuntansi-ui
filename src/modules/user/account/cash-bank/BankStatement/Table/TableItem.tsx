import Badge from "@components/ui/badge/Badge";
import { formatIDRLocale } from "@helpers/currency";
import type { Ledger } from "@services/user/report/ledger/interfaces/response.type";

interface Props {
  item: Ledger;
}

export default function TableItem({ item }: Props) {
  return (
    <tr>
      <td className="px-5 py-1 text-gray-500 text-start text-theme-xs dark:text-gray-400">
        {item.date}
      </td>
      <td className="px-5 py-1 text-gray-500 text-start text-theme-xs dark:text-gray-400 ">
        {item.description}
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
      <td className="px-5 py-1 text-black text-center text-theme-xs dark:text-white whitespace-nowrap font-semibold">
        <Badge variant="light" color={"primary"} size="sm">
          {"Import"}
        </Badge>
      </td>
    </tr>
  );
}
