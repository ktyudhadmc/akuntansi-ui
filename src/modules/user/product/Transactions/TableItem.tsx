import { TableCell, TableRow } from "@components/ui/table";
import { formatDateAsYMD } from "@helpers/date";
import type { ProductTransaction } from "@services/user/product/transaction/interfaces/response.type";
import { Link } from "react-router-dom";

interface Props {
  item: ProductTransaction;
}

export default function TableItem({ item }: Props) {
  const getTransactionUrl = (id: number, type: string) => {
    switch (type) {
      case "sales":
        return `/user/sales/${id}`;
      case "purchase":
        return `/user/purchases/${id}`;
      default:
        return "#";
    }
  };

  return (
    <TableRow>
      <TableCell>{formatDateAsYMD(item.transaction_date)}</TableCell>
      <TableCell>
        <Link
          to={getTransactionUrl(item.id, item.reference_type)}
          className="cursor-pointer text-brand-500 dark:text-gray-400 hover:underline"
        >
          ({item.transaction_number ?? "-"})
        </Link>
      </TableCell>
      <TableCell>
        {item.quanity} {item.unit.name}
      </TableCell>
    </TableRow>
  );
}
