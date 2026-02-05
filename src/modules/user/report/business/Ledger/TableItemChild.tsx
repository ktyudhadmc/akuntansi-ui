import { useState } from "react";
import { HiChevronDown } from "react-icons/hi";

import { formatIDRLocale } from "@helpers/currency";
import TableItemChildDetail from "./TableItemChildDetail";

// import type { AccountWithBalance } from "@services/user/report/ledger/interfaces/response.type";
import type { LedgerItemWithBalance } from "@services/user/report/ledger/interfaces/response.type";

interface Props {
  // child: AccountWithBalance;
  child: LedgerItemWithBalance;
}

export default function TableItemChild({ child }: Props) {
  const [openChildren, setOpenChildren] = useState(false);

  return (
    <>
      <tr className="bg-gray-50 dark:bg-gray-800">
        <td
          colSpan={5}
          className="pl-10 py-1 text-sm text-gray-500 dark:text-gray-400"
        >
          <div
            className="flex gap-2 cursor-pointer text-black dark:text-white"
            onClick={() => setOpenChildren((v) => !v)}
          >
            <button
              type="button"
              className={`flex shrink-0 items-center justify-center rounded-full bg-gray-100 transition-transform duration-200 ease-linear
              dark:bg-white/[0.03] text-gray-800 dark:text-white/90
              ${openChildren ? "rotate-180" : ""}`}
            >
              <HiChevronDown className="size-5" />
            </button>
            ({child.code}) - {child.name}
          </div>
        </td>
      </tr>

      {/* {openChildren && (
        <TableItemChildDetail
          onOpen={openChildren}
          accountId={Number(child.id)}
        />
      )} */}

      {openChildren &&
        child.transactions.map((item, index) => (
          <TableItemChildDetail
            key={`table-item-detail-${index}`}
            onOpen={openChildren}
            item={item}
          />
        ))}

      <tr>
        <td
          className="px-5 py-1 font-semibold text-black text-end text-theme-xs dark:text-white"
          colSpan={2}
        >
          Total
        </td>
        <td className="px-5 py-1 text-black text-end text-theme-xs dark:text-white whitespace-nowrap font-semibold">
          {formatIDRLocale(child.debit)}
        </td>
        <td className="px-5 py-1 text-black text-end text-theme-xs dark:text-white whitespace-nowrap font-semibold">
          {formatIDRLocale(child.credit)}
        </td>
        <td className="px-5 py-1 text-black text-end text-theme-xs dark:text-white whitespace-nowrap font-semibold">
          {formatIDRLocale(child.balance)}
        </td>
      </tr>
    </>
  );
}
