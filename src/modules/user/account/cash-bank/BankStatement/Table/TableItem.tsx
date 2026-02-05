import Badge from "@components/ui/badge/Badge";
import { formatIDRLocale } from "@helpers/currency";
import type { BankStatement } from "@services/user/account/cash-bank/interfaces/response-bank-statement.type";

interface Props {
  item: BankStatement;
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
        {item.type == "in" ? formatIDRLocale(item.amount) : 0}
      </td>
      <td className="px-5 py-1 text-black text-end text-theme-xs dark:text-white whitespace-nowrap font-semibold">
        {item.type == "out" ? formatIDRLocale(item.amount) : 0}
      </td>
      <td className="px-5 py-1 text-black text-end text-theme-xs dark:text-white whitespace-nowrap font-semibold">
        {formatIDRLocale(0)}
      </td>
      <td className="px-5 py-1 text-black text-center text-theme-xs dark:text-white whitespace-nowrap font-semibold">
        <Badge variant="light" color={"primary"} size="sm">
          {"Import"}
        </Badge>
      </td>
    </tr>
  );
}
