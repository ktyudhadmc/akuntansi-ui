import { useState } from "react";
import { HiChevronDown } from "react-icons/hi";

// import type { LedgerAccount } from "@services/user/report/ledger/interfaces/response.type";
import type { LedgerAllResponse } from "@services/user/report/ledger/interfaces/response.type";
import TableItemChild from "./TableItemChild";
import { formatIDRLocale, sumBy } from "@helpers/currency";

interface Props {
  // item: LedgerAccount;
  item: LedgerAllResponse;
}

export default function TableItem({ item }: Props) {
  const [open, setOpen] = useState(true);

  const grandTotalBalance = sumBy(item.children, (i) => i.balance);
  const grandTotalCredit = sumBy(item.children, (i) => i.credit);
  const grandTotalDebit = sumBy(item.children, (i) => i.debit);

  return (
    <>
      <tr className="bg-gray-50 dark:bg-gray-800">
        <td
          colSpan={5}
          className="px-5 py-1 text-gray-500 text-start text-sm dark:text-gray-400"
        >
          <div
            className="flex gap-2 cursor-pointer font-bold text-brand-600 dark:text-white mr-1"
            onClick={() => setOpen((v) => !v)}
          >
            <button
              type="button"
              className={`flex shrink-0 items-center justify-center rounded-full bg-gray-100 transition-transform duration-200 ease-linear
              dark:bg-white/[0.03] text-gray-800 dark:text-white/90
              ${open ? "rotate-180" : ""}`}
            >
              <HiChevronDown className="size-5" />
            </button>
            ({item.code}) - {item.name}
          </div>
        </td>
      </tr>

      {open &&
        item.children.map((child, index) => {
          return (
            <TableItemChild key={`table-item-child-${index}`} child={child} />
          );
        })}

      <tr>
        <td
          className="px-5 py-1 text-black text-end text-theme-xs dark:text-white whitespace-nowrap"
          colSpan={2}
        >
          ({item.code}) - {item.name} | Saldo Akhir
        </td>
        <td className="px-5 py-1 text-black text-end text-theme-xs dark:text-white whitespace-nowrap font-semibold">
          {formatIDRLocale(grandTotalDebit)}
        </td>
        <td className="px-5 py-1 text-black text-end text-theme-xs dark:text-white whitespace-nowrap font-semibold">
          {formatIDRLocale(grandTotalCredit)}
        </td>
        <td className="px-5 py-1 text-black text-end text-theme-xs dark:text-white whitespace-nowrap font-semibold">
          {formatIDRLocale(grandTotalBalance)}
        </td>
      </tr>
    </>
  );
}
