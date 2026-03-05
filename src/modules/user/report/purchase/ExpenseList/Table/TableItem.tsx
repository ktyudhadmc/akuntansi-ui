import { Link } from "react-router-dom";

import Badge from "@components/ui/badge/Badge";
import { TableCell, TableRow } from "@components/ui/table";
import { formatIDRLocale } from "@helpers/currency";
import { formatDateAsYMD } from "@helpers/date";

import type { ExpenseList } from "@services/user/report/expense-list/interfaces/response.type";

interface Props {
  item: ExpenseList;
}

export default function TableItem({ item }: Props) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "unpaid":
        return "error";
      case "paid":
        return "success";
      case "partial":
        return "warning";
      default:
        return "primary";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "unpaid":
        return "Tidak Dibayar";
      case "paid":
        return "Lunas";
      case "partial":
        return "Terbayar Sebagian";
      default:
        return "Menunggu Pembayaran";
    }
  };

  return (
    <TableRow>
      <TableCell className="whitespace-nowrap">
        {formatDateAsYMD(item.transaction_date)}
      </TableCell>
      <TableCell className="whitespace-nowrap">Expenses</TableCell>
      <TableCell className="whitespace-nowrap">
        <Link
          to={`/user/purchases/${item.reference_id}`}
          className="cursor-pointer text-brand-500 dark:text-white hover:underline"
        >
          {item.transaction_number}
        </Link>
      </TableCell>

      <TableCell className="whitespace-nowrap">
        <Link
          to={`/user/accounts/chart-of-account/${item.account.id}`}
          className="cursor-pointer text-brand-500 dark:text-white hover:underline"
        >
          {item.account.name}
        </Link>
      </TableCell>
      <TableCell className="lg:max-w-xs w-48 line-clamp-3">
        {item.description}
      </TableCell>

      <TableCell className="whitespace-nowrap">
        <Link
          to={`/user/contacts/${item.supplier.id}/edit?tab=supplier`}
          className="cursor-pointer text-brand-500 dark:text-white hover:underline"
        >
          {item.supplier.name}
        </Link>
      </TableCell>

      <TableCell className="capitalize whitespace-nowrap text-center">
        <Badge size="sm" color={getStatusColor(item.transaction_status.name)}>
          {getStatusLabel(item.transaction_status.name)}
        </Badge>
      </TableCell>

      <TableCell className="text-black dark:text-white text-end whitespace-nowrap">
        {formatIDRLocale(item.amount)}
      </TableCell>
      <TableCell className="text-black dark:text-white text-end whitespace-nowrap">
        {formatIDRLocale(item.tax)}
      </TableCell>
      <TableCell className="text-black dark:text-white text-end whitespace-nowrap">
        {formatIDRLocale(item.remaining)}
      </TableCell>
    </TableRow>
  );
}
