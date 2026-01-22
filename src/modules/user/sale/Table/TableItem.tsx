// import Badge from "@components/ui/badge/Badge";
import TableItemMenu from "./TableItemMenu";
import { formattedCurrency } from "@helpers/currency";
import type { Purchase } from "@services/user/purchase/interfaces/response.type";

interface Props {
  item: Purchase;
}

export default function TableItem({ item }: Props) {
  return (
    <tr>
      <td className="px-5 py-1 text-gray-500 text-start text-theme-xs dark:text-gray-400">
        {item.date}
      </td>
      <td className="px-5 py-1.5 text-gray-500 text-start text-theme-xs dark:text-gray-400">
        {item.document_number}
      </td>
      <td className="px-5 py-1.5 text-gray-500 text-start text-theme-xs dark:text-gray-400 ">
        {item.supplier.name}
      </td>
      <td className="px-4 py-1.5 text-gray-500 text-start text-theme-xs dark:text-gray-400">
        {item.material.code}
        <h4 className="uppercase">{item.material.name}</h4>
      </td>
      <td className="px-5 py-1.5 text-gray-500 text-start text-theme-xs dark:text-gray-400 ">
        {item.account.code}
        <p className="text-theme-xs">{item.account.name}</p>
      </td>
      <td className="px-5 py-1.5 text-gray-500 text-start text-theme-xs dark:text-gray-400 ">
        {item.counter_account.code}
        <p className="text-theme-xs">{item.counter_account.name}</p>
      </td>
      <td className="px-4 py-1.5 text-gray-500 text-start text-theme-xs dark:text-gray-400">
        {item.qty} {item.unit.name}
      </td>
      <td className="px-4 py-1.5 text-gray-500 text-start text-theme-xs dark:text-gray-400">
        {formattedCurrency(item.price)}
      </td>
      <td className="px-4 py-1.5 text-gray-500 text-start text-theme-xs dark:text-gray-400">
        {formattedCurrency(item.total_price)}
      </td>

      <td className="px-4 py-3  whitespace-nowrap text-gray-500 text-start text-theme-xs dark:text-gray-400">
        <TableItemMenu
          id={item.id}
          name={item.material.name}
          sku={item.material.code}
        />
      </td>
    </tr>
  );
}
