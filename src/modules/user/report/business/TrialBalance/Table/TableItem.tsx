import { formatIDRLocale } from "@helpers/currency";
import type { TrialBalanceAccount } from "@services/user/report/trial-balance/interfaces/response.type";
import { Link } from "react-router-dom";

interface Props {
  item: TrialBalanceAccount;
}

export default function TableItem({ item }: Props) {
  const getAccountUrl = (id: number, categoryId?: number | null) => {
    const cashBank = categoryId == 3;

    /** redirect cashbank */
    if (cashBank) return `/user/accounts/cash-bank/${id}`;

    /** redirect coa */
    return `/user/accounts/chart-of-account/${id}`;
  };

  return (
    <tr>
      <td className="pl-5 py-1 text-black text-start text-theme-xs dark:text-white whitespace-nowrap">
        <Link
          to={getAccountUrl(item.id)}
          className="cursor-pointer text-brand-400 dark:text-white whitespace-nowrap hover:underline"
        >
          {item.code}
        </Link>
      </td>
      <td className="px-5 py-1 text-black text-start text-theme-xs dark:text-white whitespace-nowrap border-r dark:border-white/[0.10]">
        <Link
          to={getAccountUrl(item.id)}
          className="cursor-pointer text-brand-400 dark:text-white whitespace-nowrap hover:underline"
        >
          {item.name}
        </Link>
      </td>
      <td className="px-5 py-1 text-black text-end text-theme-xs dark:text-gray-400 whitespace-nowrap border-r dark:border-white/[0.10]">
        {formatIDRLocale(item.opening_balance.debit)}
      </td>
      <td className="px-5 py-1 text-black text-end text-theme-xs dark:text-gray-400 whitespace-nowrap border-r dark:border-white/[0.10]">
        {formatIDRLocale(item.opening_balance.credit)}
      </td>
      <td className="px-5 py-1 text-black text-end text-theme-xs dark:text-gray-400 whitespace-nowrap border-r dark:border-white/[0.10]">
        {formatIDRLocale(item.movements.total_movement.debit)}
      </td>
      <td className="px-5 py-1 text-black text-end text-theme-xs dark:text-gray-400 whitespace-nowrap border-r dark:border-white/[0.10]">
        {formatIDRLocale(item.movements.total_movement.credit)}
      </td>
      <td className="px-5 py-1 text-black text-end text-theme-xs dark:text-gray-400 whitespace-nowrap border-r dark:border-white/[0.10]">
        {formatIDRLocale(item.closing_balance.debit)}
      </td>
      <td className="px-5 py-1 text-black text-end text-theme-xs dark:text-gray-400 whitespace-nowrap border-r dark:border-white/[0.10]">
        {formatIDRLocale(item.closing_balance.credit)}
      </td>
    </tr>
  );
}
