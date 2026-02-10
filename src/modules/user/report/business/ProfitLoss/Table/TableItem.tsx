import { formatIDRLocale } from "@helpers/currency";
import type { Account } from "@services/user/report/ledger/interfaces/response.type";
import { Link } from "react-router-dom";

interface Props {
  item: Account;
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
      <td
        colSpan={2}
        className="pl-10 py-1 text-sm text-brand-600 dark:text-gray-400"
      >
        <Link to={getAccountUrl(Number(item.id), 3)}>
          ({item.code}) - {item.name}
        </Link>
      </td>

      <td className="px-5 py-1 text-black text-end text-theme-xs dark:text-white whitespace-nowrap font-semibold">
        {formatIDRLocale(0)}
      </td>
    </tr>
  );
}
