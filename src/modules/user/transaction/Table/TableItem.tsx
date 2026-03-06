import { Link } from "react-router-dom";

import { formatDateAsYMD, formatIDRLocale } from "@helpers/index";

import { TableCell, TableRow } from "@components/ui/table";
import Badge, { type BadgeColor } from "@components/ui/badge/Badge";

import type { Transaction } from "@services/user/transaction/interfaces/response.type";

interface Props {
  item: Transaction;
}

export default function TableItem({ item }: Props) {
  const TRANSACTION_STATUS: Record<
    string,
    { label: string; color: BadgeColor }
  > = {
    unpaid: {
      label: "Belum Dibayar",
      color: "warning",
    },
    completed: {
      label: "Selesai",
      color: "success",
    },
    paid: {
      label: "Lunas",
      color: "success",
    },
    "partially-paid": {
      label: "Terbayar Sebagian",
      color: "info",
    },
    overdue: {
      label: "Lewat Jatuh Tempo",
      color: "error",
    },
    unused: {
      label: "Tidak Digunakan",
      color: "light",
    },
    pending: {
      label: "Tertunda",
      color: "warning",
    },
    approved: {
      label: "Disetujui",
      color: "primary",
    },
    rejected: {
      label: "Ditolak",
      color: "error",
    },
    draft: {
      label: "Draf",
      color: "dark",
    },
    void: {
      label: "Batal",
      color: "dark",
    },
    "partially-sent": {
      label: "Terkirim Sebagian",
      color: "info",
    },
    canceled: {
      label: "Dibatalkan",
      color: "dark",
    },
    "canceled-partially-delivered": {
      label: "Dibatalkan & dikirim sebagian",
      color: "dark",
    },
  };

  return (
    <TableRow>
      <TableCell className="text-start whitespace-nowrap">
        {formatDateAsYMD(item.transaction_date)}
      </TableCell>
      <TableCell className="text-start whitespace-nowrap">
        <Link
          to={`${item.reference_id}`}
          className={`flex my-auto text-brand-600`}
        >
          {item.transaction_number}
        </Link>
      </TableCell>
      <TableCell>{item.description}</TableCell>
      <TableCell className="text-start whitespace-nowrap">
        <Link
          to={`../contacts/${item.contact.id}/edit?supplier`}
          className={`flex my-auto text-brand-600`}
        >
          {item.contact.name}
        </Link>
      </TableCell>
      <TableCell className="text-start whitespace-nowrap">
        {formatDateAsYMD(item.transaction_date)}
      </TableCell>
      <TableCell className="text-center whitespace-nowrap">
        <Badge
          size="sm"
          color={TRANSACTION_STATUS[item.status]?.color ?? "light"}
        >
          {TRANSACTION_STATUS[item.status]?.label ?? item.status}
        </Badge>
      </TableCell>
      <TableCell className="text-end whitespace-nowrap font-medium !text-black dark:!text-white">
        {formatIDRLocale(item.remaining)}
      </TableCell>
      <TableCell className="text-end whitespace-nowrap font-medium !text-black dark:!text-white">
        {formatIDRLocale(item.amount)}
      </TableCell>
    </TableRow>
  );
}
