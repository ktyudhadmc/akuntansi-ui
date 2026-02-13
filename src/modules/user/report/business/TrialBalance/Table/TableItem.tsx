import { formatIDRLocale } from "@helpers/currency";
import type { TrialBalanceAccount } from "@services/user/report/trial-balance/interfaces/response.type";

interface Props {
  item: TrialBalanceAccount;
}

export default function TableItem({ item }: Props) {
  return (
    <tr>
      <td className="pl-5 py-1 text-black text-start text-theme-xs dark:text-white whitespace-nowrap">
        {item.code}
      </td>
      <td className="px-5 py-1 text-black text-start text-theme-xs dark:text-white whitespace-nowrap border-r dark:border-white/[0.10]">
        {item.name}
      </td>
      <td className="px-5 py-1 text-black text-end text-theme-xs dark:text-white whitespace-nowrap border-r dark:border-white/[0.10]">
        {formatIDRLocale(item.opening_balance.debit)}
      </td>
      <td className="px-5 py-1 text-black text-end text-theme-xs dark:text-white whitespace-nowrap border-r dark:border-white/[0.10]">
        {formatIDRLocale(item.opening_balance.credit)}
      </td>
      <td className="px-5 py-1 text-black text-end text-theme-xs dark:text-white whitespace-nowrap border-r dark:border-white/[0.10]">
        {formatIDRLocale(item.movement_balance.debit)}
      </td>
      <td className="px-5 py-1 text-black text-end text-theme-xs dark:text-white whitespace-nowrap border-r dark:border-white/[0.10]">
        {formatIDRLocale(item.movement_balance.credit)}
      </td>
      <td className="px-5 py-1 text-black text-end text-theme-xs dark:text-white whitespace-nowrap border-r dark:border-white/[0.10]">
        {formatIDRLocale(item.closing_balance.debit)}
      </td>
      <td className="px-5 py-1 text-black text-end text-theme-xs dark:text-white whitespace-nowrap border-r dark:border-white/[0.10]">
        {formatIDRLocale(item.closing_balance.credit)}
      </td>
    </tr>
  );
}
