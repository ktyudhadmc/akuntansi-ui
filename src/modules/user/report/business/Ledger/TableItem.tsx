import { formatIDRLocale } from "@helpers/currency";
import type { Account } from "@services/user/account/index/interfaces/response.type";
import { useState } from "react";
import { HiChevronDown } from "react-icons/hi";

import TableItemDetail from "./TableItemDetail";

interface Props {
  item: Account;
}

export default function TableItem({ item }: Props) {
  const [open, setOpen] = useState(false);

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

      {open && <TableItemDetail onOpen={open} accountId={item.id} />}

      <tr>
        <td
          className="px-5 py-1 text-black text-end text-theme-xs dark:text-white"
          colSpan={2}
        >
          (1-0003) BCA | Saldo Akhir
        </td>
        <td className="px-5 py-1 text-black text-end text-theme-xs dark:text-white whitespace-nowrap font-semibold">
          {formatIDRLocale(0)}
        </td>
        <td className="px-5 py-1 text-black text-end text-theme-xs dark:text-white whitespace-nowrap font-semibold">
          {formatIDRLocale(0)}
        </td>
        <td className="px-5 py-1 text-black text-end text-theme-xs dark:text-white whitespace-nowrap font-semibold">
          {formatIDRLocale(0)}
        </td>
      </tr>
    </>
  );
}
