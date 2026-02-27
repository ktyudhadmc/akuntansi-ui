import { Link } from "react-router-dom";

import { formatIDRLocale } from "@helpers/currency";
import Badge from "@components/ui/badge/Badge";

import type { Sale } from "@services/user/sale/interfaces/response.type";
import TableItemAction from "./TableItemAction";
import { TableCell, TableRow } from "@components/ui/table";
import { Tooltip } from "@components/ui/tooltip";

interface Props {
  item: Sale;
  openDropdownId: string | null;
  setOpenDropdownId: (id: string | null) => void;
}

export default function TableItem({
  item,
  openDropdownId,
  setOpenDropdownId,
}: Props) {
  const isService = item.items[0]?.service_type.id == "1";

  return (
    <TableRow>
      <TableCell className="text-start whitespace-nowrap">
        {item.date}
      </TableCell>
      <TableCell className="text-start whitespace-nowrap">
        <Link to={`${item.id}`} className={`flex my-auto text-brand-600`}>
          {item.document_number}
        </Link>
      </TableCell>
      <TableCell className="text-start whitespace-nowrap">
        <Link
          to={`../contacts/${item.customer.id}/edit?tab=customer`}
          className={`flex my-auto text-brand-600`}
        >
          {item.customer.name}
        </Link>
      </TableCell>

      <TableCell className="text-start whitespace-nowrap">
        <Badge size="sm" color={isService ? "info" : "success"}>
          {item.items[0]?.service_type.name}
        </Badge>
      </TableCell>
      <TableCell className="text-end whitespace-nowrap">
        {item.items.map((value) => (
          <div className="flex">
            <p className="w-64 truncate">{value.material.name}</p>
            <p className="w-20 text-right whitespace-nowrap">
              {value.qty} {value.unit.name}
            </p>
            <p className="w-28 text-right whitespace-nowrap">
              {formatIDRLocale(value.price, { withSymbol: true })}
            </p>
          </div>
        ))}
      </TableCell>

      <TableCell className="text-end text-black dark:text-white font-medium whitespace-nowrap cursor-pointer">
        <Tooltip
          text={formatIDRLocale(item.total_gross, { withSymbol: true })}
          className="!min-w-fit"
        >
          {formatIDRLocale(item.total_gross, { withSymbol: true })}
        </Tooltip>
      </TableCell>
      <TableCell className="text-end whitespace-nowrap">
        {/* <TableItemMenu id={item.id} invoice={item.document_number} /> */}
        <TableItemAction
          id={item.id}
          invoice={item.document_number}
          openDropdownId={openDropdownId}
          setOpenDropdownId={setOpenDropdownId}
        />
      </TableCell>
    </TableRow>
  );
}
