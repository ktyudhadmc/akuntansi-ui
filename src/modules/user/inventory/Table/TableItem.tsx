import TableItemMenu from "./TableItemMenu";
import type { Inventory } from "@services/user/inventory/interfaces/response.type";

interface Props {
  item: Inventory;
}

export default function TableItem({ item }: Props) {
  return (
    <tr>
      <td className="px-5 py-3 text-gray-500 text-start text-theme-xs dark:text-gray-400 whitespace-nowrap">
        {item.name}
      </td>

      <td className="px-4 py-3  whitespace-nowrap text-gray-500 text-start text-theme-xs dark:text-gray-400">
        <TableItemMenu id={item.id} name={item.name} />
      </td>
    </tr>
  );
}
