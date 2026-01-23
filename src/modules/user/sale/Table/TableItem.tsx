// import Badge from "@components/ui/badge/Badge";
import TableItemMenu from "./TableItemMenu";
import { formattedCurrency } from "@helpers/currency";
import type { Sale } from "@services/user/sale/interfaces/response.type";

interface Props {
  item: Sale;
}

export default function TableItem({ item }: Props) {
  return (
    <tr>
      <td className="px-5 py-1 text-gray-500 text-start text-theme-xs dark:text-gray-400 whitespace-nowrap">
        {item.date}
      </td>
      <td className="px-5 py-1.5 text-gray-500 text-start text-theme-xs dark:text-gray-400 whitespace-nowrap">
        {item.document_number}
      </td>
      <td className="px-5 py-1.5 text-gray-500 text-start text-theme-xs dark:text-gray-400 font-semibold uppercase">
        {item.customer.name}
      </td>
      <td className="px-4 py-1.5 text-gray-500 text-start text-theme-xs dark:text-gray-400">
        <span className="font-semibold">{item.material.code}</span>
        <h4 className="uppercase">{item.material.name}</h4>
      </td>
      <td className="px-5 py-1.5 text-gray-500 text-start text-theme-xs dark:text-gray-400 ">
        <span className="font-semibold">{item.account.code}</span>
        <p className="text-theme-xs">{item.account.name}</p>
      </td>
      <td className="px-5 py-1.5 text-gray-500 text-start text-theme-xs dark:text-gray-400 ">
        <span className="font-semibold">{item.counter_account.code}</span>
        <p className="text-theme-xs">{item.counter_account.name}</p>
      </td>
      <td className="px-4 py-1.5 text-gray-500 text-start text-theme-xs dark:text-gray-400">
        {item.qty}
        <p className="text-theme-xs">{item.unit.name}</p>
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
          invoice={item.document_number}
        />
      </td>
    </tr>
  );
}
