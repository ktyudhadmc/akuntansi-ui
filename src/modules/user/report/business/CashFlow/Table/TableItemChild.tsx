import type { CashflowItem } from ".";
import { formatIDRLocale } from "@helpers/currency";
import { TableCell, TableRow } from "@components/ui/table";

interface Props {
  child: CashflowItem;
}

export default function TableItemChild({ child }: Props) {
  return (
    <TableRow>
      <TableCell className="pl-10 !text-sm whitespace-nowrap">
        {child.name}
      </TableCell>
      <TableCell className="whitespace-nowrap !text-sm !text-black dark:!text-white text-end">
        {formatIDRLocale(child.amount)}
      </TableCell>
    </TableRow>
  );
}
