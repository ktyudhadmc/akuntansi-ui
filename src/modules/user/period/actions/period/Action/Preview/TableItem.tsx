import { formatIDRLocale } from "@helpers/currency";
import type { PeriodLockPreview } from "@services/user/period/interfaces/response-lock-preview.type";

interface Props {
  item: PeriodLockPreview;
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
        {item.trial_balance && formatIDRLocale(item.trial_balance.debit)}
      </td>
      <td className="px-5 py-1 text-black text-end text-theme-xs dark:text-white whitespace-nowrap border-r dark:border-white/[0.10]">
        {item.trial_balance && formatIDRLocale(item.trial_balance.credit)}
      </td>
      <td className="px-5 py-1 text-black text-end text-theme-xs dark:text-white whitespace-nowrap border-r dark:border-white/[0.10]">
        {item.statement_balance &&
          formatIDRLocale(item.statement_balance.debit)}
      </td>
      <td className="px-5 py-1 text-black text-end text-theme-xs dark:text-white whitespace-nowrap border-r dark:border-white/[0.10]">
        {item.statement_balance &&
          formatIDRLocale(item.statement_balance.credit)}
      </td>
      <td className="px-5 py-1 text-black text-end text-theme-xs dark:text-white whitespace-nowrap border-r dark:border-white/[0.10]">
        {item.balance_sheet && formatIDRLocale(item.balance_sheet.debit)}
      </td>
      <td className="px-5 py-1 text-black text-end text-theme-xs dark:text-white whitespace-nowrap border-r dark:border-white/[0.10]">
        {item.balance_sheet && formatIDRLocale(item.balance_sheet.credit)}
      </td>
    </tr>
  );
}
