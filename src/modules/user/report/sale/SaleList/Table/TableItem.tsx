import Badge from "@components/ui/badge/Badge";
import { TableCell, TableRow } from "@components/ui/table";
import { formatIDRLocale } from "@helpers/currency";
import { formatDateAsYMD } from "@helpers/date";
import type { SaleList } from "@services/user/report/sale-list/interfaces/response.type";
import { Link } from "react-router-dom";

interface Props {
  item: SaleList;
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
      <TableCell>{formatDateAsYMD(item.transaction_date)}</TableCell>
      <TableCell>{item.transaction_type.name}</TableCell>
      <TableCell>
        <Link
          to={`/user/sales/${item.id}`}
          className="cursor-pointer text-brand-500 dark:text-white hover:underline"
        >
          {item.transaction_number}
        </Link>
      </TableCell>
      <TableCell>
        <Link
          to={`/user/contacts/${item.customer.id}/edit?tab=customer`}
          className="cursor-pointer text-brand-500 dark:text-white hover:underline"
        >
          {item.customer.name}
        </Link>
      </TableCell>
      <TableCell className="capitalize">
        <Badge size="sm" color={getStatusColor(item.transaction_status.name)}>
          {getStatusLabel(item.transaction_status.name)}
        </Badge>
      </TableCell>
      <TableCell className="max-w-xs line-clamp-3">
        {item.description}
      </TableCell>
      <TableCell className="text-black dark:text-white text-end whitespace-nowrap">
        {formatIDRLocale(item.original_amount, { withSymbol: true })}
      </TableCell>
      <TableCell className="text-black dark:text-white text-end whitespace-nowrap">
        {formatIDRLocale(item.balance_due, { withSymbol: true })}
      </TableCell>
    </TableRow>
  );
}
