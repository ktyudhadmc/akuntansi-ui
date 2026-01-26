import Badge from "@components/ui/badge/Badge";
import TableItemMenu from "./TableItemMenu";
import type { Adjustment } from "@services/user/inventory/adjustment/interfaces/response.type";

interface Props {
  item: Adjustment;
}

export default function TableItem({ item }: Props) {
  return (
    <tr>
      <td className="px-5 py-2 text-gray-500 text-start text-theme-xs dark:text-gray-400 whitespace-nowrap">
        <h4 className="font-semibold dark:text-white">{item.material?.name ?? '-'}</h4>
        <p>{item.description}</p>
      </td>
      <td className="px-5 py-2 text-gray-500 text-start text-theme-xs dark:text-gray-400 whitespace-nowrap">
        {item.date}
      </td>
      <td className="px-5 py-2 text-gray-500 text-start text-theme-xs dark:text-gray-400 whitespace-nowrap">
        {item.type == "out" ? (
          <Badge variant="light" color="error" size="sm">
            KELUAR
          </Badge>
        ) : (
          <Badge variant="light" color="success" size="sm">
            MASUK
          </Badge>
        )}
      </td>
      <td className="px-5 py-2 text-gray-500 text-start text-theme-xs dark:text-gray-400 whitespace-nowrap">
        {item.qty}
      </td>

      <td className="px-4 py-2 whitespace-nowrap text-gray-500 text-start text-theme-xs dark:text-gray-400">
        <TableItemMenu id={item.id} name={item.material?.name ?? '-'} />
      </td>
    </tr>
  );
}
