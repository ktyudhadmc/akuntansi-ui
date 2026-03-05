import { Link } from "react-router-dom";

import { TableCell, TableRow } from "@components/ui/table";
import { formatIDRLocale } from "@helpers/currency";
import { formatDateAsYMD } from "@helpers/date";

import type { ExpenseDetail } from "@services/user/report/expense-detail/interfaces/response.type";

interface Props {
  item: ExpenseDetail;
}

export default function TableItem({ item }: Props) {
  return (
    <>
      <TableRow className="bg-gray-50 dark:bg-gray-800">
        <TableCell
          className="whitespace-nowrap !text-brand-600 dark:!text-white font-medium !text-sm "
          colSpan={5}
        >
          {item.name}
        </TableCell>
      </TableRow>

      {item.transactions.map((child) => (
        <TableRow>
          <TableCell className="whitespace-nowrap">
            {formatDateAsYMD(child.transaction_date)}
          </TableCell>
          <TableCell className="whitespace-nowrap">
            <Link
              to={`/user/purchases/${child.reference_id}`}
              className="cursor-pointer text-brand-500 dark:text-white hover:underline capitalize"
            >
              {child.reference_type}
            </Link>
          </TableCell>
          <TableCell className="whitespace-nowrap">
            <Link
              to={`/user/purchases/${child.reference_id}`}
              className="cursor-pointer text-brand-500 dark:text-white hover:underline"
            >
              {child.transaction_number}
            </Link>
          </TableCell>

          <TableCell className="lg:max-w-xs w-48 line-clamp-3">
            {child.description}
          </TableCell>

          <TableCell className="text-black dark:text-white text-end whitespace-nowrap">
            {formatIDRLocale(child.amount)}
          </TableCell>
        </TableRow>
      ))}

      <TableRow>
        <TableCell
          className="whitespace-nowrap !text-black dark:!text-white font-medium !text-theme-sm "
          colSpan={4}
        >
          Sub Total
        </TableCell>
        <TableCell className="text-end !text-black dark:!text-white font-medium !text-theme-sm">
          {formatIDRLocale(item.sub_total)}
        </TableCell>
      </TableRow>
    </>
  );
}
