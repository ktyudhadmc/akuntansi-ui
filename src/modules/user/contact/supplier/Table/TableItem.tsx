// import Badge from "@components/ui/badge/Badge";
import type { Contact } from "@services/user/supplier/interfaces/response.type";
import TableItemMenu from "./TebleItemMenu";
import { TableCell, TableRow } from "@components/ui/table";

interface Props {
  item: Contact;
}

export default function TableItem({ item }: Props) {
  return (
    <TableRow>
      <TableCell className="font-semibold">{item.code}</TableCell>
      <TableCell>
        <h4 className="font-bold uppercase">{item.name}</h4>
        {/* <div className="flex gap-2 mt-2">
          {item.is_customer && (
            <Badge variant="light" color="info">
              Pelanggan
            </Badge>
          )}
          {item.is_supplier && (
            <Badge variant="light" color="success">
              Supplier
            </Badge>
          )}
        </div> */}
      </TableCell>
      {/* <td className="px-5 py-1 text-gray-500 text-start text-theme-xs dark:text-gray-400 whitespace-nowrap">
        {item.email}
      </td>
      <td className="px-5 py-1 text-gray-500 text-start text-theme-xs dark:text-gray-400 whitespace-nowrap">
        {item.phone}
      </td> */}
      <TableCell className="text-end">
        <TableItemMenu id={item.id} code={item.code} name={item.name} />
      </TableCell>
    </TableRow>
  );
}
