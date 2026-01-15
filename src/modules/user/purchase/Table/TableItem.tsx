// import Badge from "@components/ui/badge/Badge";
import type { Contact } from "@services/user/supplier/interfaces/response.type";
import TableItemMenu from "./TebleItemMenu";

interface Props {
  item: Contact;
}

export default function TableItem({ item }: Props) {
  return (
    <tr>
      <td className="px-5 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 whitespace-nowrap">
        {item.code}
      </td>
      <td className="px-5 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 whitespace-nowrap">
        {item.name}
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
      {/* <td className="px-5 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 whitespace-nowrap">
        {item.email}
      </td>
      <td className="px-5 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 whitespace-nowrap">
        {item.phone}
      </td> */}
      <td className="px-5 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 whitespace-nowrap">
        <TableItemMenu id={item.id} code={item.code} name={item.name} />
      </td>
    </tr>
  );
}
