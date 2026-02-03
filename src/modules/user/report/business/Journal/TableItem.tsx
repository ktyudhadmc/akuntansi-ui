import { formatIDRLocale } from "@helpers/index";

// import TableItemMenu from "./TableItemMenu";
import type { GeneralJournal } from "@services/user/journal/interfaces/response.type";
import { Link } from "react-router-dom";

interface Props {
  item: GeneralJournal;
}

export default function TableItem({ item }: Props) {
  return (
    <>
      <tr className="bg-gray-50 dark:bg-gray-800">
        <td
          colSpan={3}
          className="px-5 py-1 text-gray-500 text-start text-sm dark:text-gray-400 "
        >
          <Link
            to={`/user/journals/${item.id}/edit`}
            className="cursor-pointer font-bold text-brand-600 dark:text-white mr-1"
          >
            Jurnal Umum #{item.document_number}
          </Link>
          | {item.date}
        </td>
      </tr>

      {/* DEBIT */}
      <tr>
        <td className="px-8 py-1 text-gray-500 text-start text-theme-xs dark:text-gray-400 ">
          <Link
            to={`/user/accounts/chart-of-account/${item.account.id}`}
            className="cursor-pointer text-brand-400 dark:text-gray-400"
          >
            ({item.account.code}) - {item.account.name}
          </Link>
        </td>
        <td className="px-5 py-1 text-gray-500 text-end text-theme-xs dark:text-gray-400 whitespace-nowrap">
          {formatIDRLocale(item.amount)}
        </td>
        <td className="px-5 py-1 text-gray-500 text-end text-theme-xs dark:text-gray-400 whitespace-nowrap">
          {formatIDRLocale(0)}
        </td>
      </tr>

      {/* CREDIT */}
      <tr className="border-b border-black dark:border-white">
        <td className="px-8 py-1 text-start text-theme-xs">
          <Link
            to={`/user/accounts/chart-of-account/${item.counter_account.id}`}
            className="cursor-pointer text-brand-400 dark:text-gray-400"
          >
            ({item.counter_account.code}) - {item.counter_account.name}
          </Link>
        </td>
        <td className="px-5 py-1 text-gray-500 text-end text-theme-xs dark:text-gray-400 whitespace-nowrap">
          {formatIDRLocale(0)}
        </td>
        <td className="px-5 py-1 text-gray-500 text-end text-theme-xs dark:text-gray-400 whitespace-nowrap ">
          {formatIDRLocale(item.amount)}
        </td>
      </tr>

      <tr>
        <td className="px-5 py-1 text-black text-end text-theme-xs dark:text-white">
          Total
        </td>
        <td className="px-5 py-1 text-black text-end text-theme-xs dark:text-white whitespace-nowrap font-semibold">
          {formatIDRLocale(item.amount)}
        </td>
        <td className="px-5 py-1 text-black text-end text-theme-xs dark:text-white whitespace-nowrap font-semibold">
          {formatIDRLocale(item.amount)}
        </td>
      </tr>
    </>
  );
}
