// import { useState } from "react";
// import { HiChevronDown } from "react-icons/hi";
// import { Link } from "react-router-dom";

import { TableCell, TableRow } from "@components/ui/table";
// import { Tooltip } from "@components/ui/tooltip";
import { formatIDRLocale } from "@helpers/index";

import type { SupplierBalance } from "@services/user/report/supplier-balance/interfaces/response.type";

interface Props {
  item: SupplierBalance;
}
export default function TableItem({ item }: Props) {
  // const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow>
        <TableCell className="font-medium text-brand-600">
          {item.supplier_name}
        </TableCell>
        <TableCell className="text-end whitespace-nowrap">
          {formatIDRLocale(item.pembelian)}
        </TableCell>
        <TableCell className="text-end whitespace-nowrap">
          {formatIDRLocale(item.uang_muka)}
        </TableCell>
        <TableCell className="text-end whitespace-nowrap">
          {formatIDRLocale(item.pembayaran)}
        </TableCell>
        <TableCell className="text-end whitespace-nowrap">
          {formatIDRLocale(item.saldo_hutang)}
        </TableCell>
      </TableRow>
      {/* <TableRow className="bg-gray-50 dark:bg-gray-800">
        <TableCell
          colSpan={6}
          className="!text-black dark:text-white font-medium"
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
            <Link
              to={`/user/contacts/${item.id}/edit?tab=customer`}
              className="cursor-pointer text-brand-500 dark:text-white hover:underline"
            >
              {item.name}
            </Link>
          </div>
        </TableCell>
      </TableRow>

      {open &&
        item.transaction?.map((child, index) => (
          <TableRow key={`table-item-${index}`}>
            <TableCell className="whitespace-nowrap">
              {formatDateAsYMD(child.transaction_date)}
            </TableCell>
            <TableCell>
              <Link
                to={`/user/sales/${child.id}`}
                className="cursor-pointer text-brand-500 dark:!text-white hover:underline"
              >
                {child.invoice_number}
              </Link>
            </TableCell>
            <TableCell>{formatDateAsYMD(child.due_date)}</TableCell>
            <TableCell className="lg:max-w-xs min-w-12 line-clamp-3">
              {child.description}
            </TableCell>
            <TableCell className="whitespace-nowrap text-end dark:!text-white !text-black font-medium cursor-pointer">
              <Tooltip
                text={formatIDRLocale(child.amount)}
                className="!min-w-fit"
              >
                {formatIDRLocale(child.amount)}
              </Tooltip>
            </TableCell>
            <TableCell className="whitespace-nowrap text-end dark:!text-white !text-black font-medium cursor-pointer">
              <Tooltip
                text={formatIDRLocale(child.remaining)}
                className="!min-w-fit"
              >
                {formatIDRLocale(child.remaining)}
              </Tooltip>
            </TableCell>
          </TableRow>
        ))}

      <TableRow className="border-t-2 border-t-gray-200 dark:border-t-gray-700">
        <TableCell
          colSpan={4}
          className="text-end !text-black dark:!text-white font-medium"
        >
          Total
        </TableCell>
        <TableCell className="whitespace-nowrap text-end dark:!text-white !text-black font-medium">
          {formatIDRLocale(item.total_amount)}
        </TableCell>
        <TableCell className="whitespace-nowrap text-end dark:!text-white !text-black font-medium">
          {formatIDRLocale(item.total_remaining)}
        </TableCell>
      </TableRow> */}
    </>
  );
}
