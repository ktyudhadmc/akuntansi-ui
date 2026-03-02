import { TableCell, TableRow } from "@components/ui/table";
import { Tooltip } from "@components/ui/tooltip";
import { formatIDRLocale, formatDateAsYMD } from "@helpers/index";
import type { CustomerBalance } from "@services/user/report/customer-balance/interfaces/response.type";
import { Link } from "react-router-dom";

interface Props {
  item: CustomerBalance;
}
export default function TableItem({ item }: Props) {
  return (
    <>
      <TableRow className="bg-gray-50 dark:bg-gray-800">
        <TableCell
          colSpan={6}
          className="!text-black dark:text-white font-semibold"
        >
          <Link
            to={`/user/contacts/${item.id}?tab=customer`}
            className="cursor-pointer text-brand-500 dark:text-white hover:underline"
          >
            {item.name}
          </Link>
        </TableCell>
      </TableRow>

      {item.transaction?.map((child, index) => (
        <TableRow key={`table-item-${index}`}>
          <TableCell className="whitespace-nowrap">
            {formatDateAsYMD(child.transaction_date)}
          </TableCell>
          <TableCell>
            <Link
              to={`/user/sales/${child.id}`}
              className="cursor-pointer text-brand-500 dark:text-white hover:underline"
            >
              {child.invoice_number}
            </Link>
          </TableCell>
          <TableCell>{formatDateAsYMD(child.due_date)}</TableCell>
          <TableCell className="lg:max-w-xs min-w-12 line-clamp-3">
            {child.description}
          </TableCell>
          <TableCell className="whitespace-nowrap text-end dark:text-white !text-black cursor-pointer">
            <Tooltip
              text={formatIDRLocale(child.amount)}
              className="!min-w-fit"
            >
              {formatIDRLocale(child.amount)}
            </Tooltip>
          </TableCell>
          <TableCell className="whitespace-nowrap text-end dark:text-white !text-black cursor-pointer">
            <Tooltip
              text={formatIDRLocale(child.remaining)}
              className="!min-w-fit"
            >
              {formatIDRLocale(child.remaining)}
            </Tooltip>
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}
