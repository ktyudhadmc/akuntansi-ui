import { TableCell, TableRow } from "@components/ui/table";
import { formatIDRLocale } from "@helpers/currency";
import { formatDateAsYMD } from "@helpers/date";
import type { SaleByCustomer } from "@services/user/report/sale-by-customer/interfaces/response.type";

import { Link } from "react-router-dom";

interface Props {
  item: SaleByCustomer;
}

export default function TableItem({ item }: Props) {
  return (
    <>
      <TableRow className="bg-gray-50 dark:bg-gray-800">
        <TableCell
          className="whitespace-nowrap !text-brand-600 dark:!text-white font-medium !text-sm "
          colSpan={9}
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
              to={`/user/sales/${child.id}`}
              className="cursor-pointer text-brand-500 dark:text-white hover:underline"
            >
              {child.transaction_type.name}
            </Link>
          </TableCell>
          <TableCell className="whitespace-nowrap">
            <Link
              to={`/user/sales/${child.id}`}
              className="cursor-pointer text-brand-500 dark:text-white hover:underline"
            >
              {child.transaction_number}
            </Link>
          </TableCell>
          <TableCell className="whitespace-nowrap">
            <Link
              to={`/user/products/${child.product.id}`}
              className="cursor-pointer text-brand-500 dark:text-white hover:underline"
            >
              {child.product.name}
            </Link>
          </TableCell>
          <TableCell className="lg:max-w-xs w-48 line-clamp-3">
            {child.description}
          </TableCell>
          <TableCell>{child.quantity}</TableCell>
          <TableCell>{child.unit.name}</TableCell>
          <TableCell className="text-black dark:text-white text-end whitespace-nowrap">
            {formatIDRLocale(child.price)}
          </TableCell>
          <TableCell className="text-black dark:text-white text-end whitespace-nowrap">
            {formatIDRLocale(child.total)}
          </TableCell>
        </TableRow>
      ))}

      <TableRow>
        <TableCell
          className="whitespace-nowrap !text-black dark:!text-white font-medium !text-theme-sm "
          colSpan={8}
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
