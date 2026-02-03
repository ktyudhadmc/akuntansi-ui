// import Badge from "@components/ui/badge/Badge";

import TableItemMenu from "./TebleItemMenu";
import type { Customer } from "@services/user/customer/interfaces/response.type";

interface Props {
  item: Customer;
}

export default function TableItem({ item }: Props) {
  return (
    <tr>
      <td className="px-5 py-1 text-gray-500 text-start text-theme-xs dark:text-gray-400 whitespace-nowrap font-semibold">
        {item.code}
      </td>
      <td className="px-5 py-1 text-gray-500 text-start text-theme-xs dark:text-gray-400 whitespace-nowrap">
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
      </td>
      {/* <td className="px-5 py-3 text-gray-500 text-start text-theme-xs dark:text-gray-400 whitespace-nowrap">
        {item.email}
      </td>
      <td className="px-5 py-3 text-gray-500 text-start text-theme-xs dark:text-gray-400 whitespace-nowrap">
        {item.phone}
      </td> */}
      <td className="px-5 py-1 text-gray-500 text-start text-theme-xs dark:text-gray-400 whitespace-nowrap">
        <TableItemMenu id={item.id} code={item.code} name={item.name} />
      </td>
    </tr>
  );
}
