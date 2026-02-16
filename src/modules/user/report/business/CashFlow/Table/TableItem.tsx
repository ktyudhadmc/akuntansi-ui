import type { CashFlow } from ".";
import { formatIDRLocale } from "@helpers/currency";
import { TableCell, TableRow } from "@components/ui/table";
import TableItemChild from "./TableItemChild";

interface Props {
  item: CashFlow;
}
export default function TableItem({ item }: Props) {
  return (
    <>
      <TableRow className="bg-gray-50 dark:bg-gray-800">
        <TableCell colSpan={3} className="!text-sm !text-black dark:!text-white whitespace-nowrap font-medium">
          {item.parent}
        </TableCell>
      </TableRow>

      {item?.child?.map((child, index) => {
        return (
          <TableItemChild
            key={`cashflow-table-item-child-${index}`}
            child={child}
          />
        );
      })}

      <TableRow className="border-y-[2px] border-gray-200 dark:border-gray-600">
        <TableCell  className="whitespace-nowrap !text-sm !text-black dark:!text-white">
          Kas bersih yang diperoleh dari {item.parent}
        </TableCell>
        <TableCell className="whitespace-nowrap !text-sm !text-black dark:!text-white text-end">
          {formatIDRLocale(item.amount)}
        </TableCell>
      </TableRow>
    </>
  );
}
