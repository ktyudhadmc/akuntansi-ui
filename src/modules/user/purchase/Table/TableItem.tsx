// import Badge from "@components/ui/badge/Badge";
// import TableItemMenu from "./TableItemMenu";
import { formatIDRLocale } from "@helpers/currency";
import { parseYMDToDate } from "@helpers/date";
import type { Purchase } from "@services/user/purchase/interfaces/response.type";
import { Link } from "react-router-dom";
import TableItemAction from "./TableItemAction";

interface Props {
  item: Purchase;
  openDropdownId: string | null;
  setOpenDropdownId: (id: string | null) => void;
}

export default function TableItem({
  item,
  openDropdownId,
  setOpenDropdownId,
}: Props) {
  return (
    <tr>
      <td className="px-5 py-1 text-gray-500 text-start text-theme-xs dark:text-gray-400 whitespace-nowrap">
        {item.date}
      </td>
      <td className="px-5 py-1.5 text-gray-500 text-start text-theme-xs dark:text-gray-400 whitespace-nowrap">
        <Link to={`${item.id}`} className={`flex my-auto text-brand-600`}>
          {item.document_number}
        </Link>
      </td>
      <td className="px-5 py-1.5 text-gray-500 text-start text-theme-xs dark:text-gray-400 whitespace-nowrap">
        <Link
          to={`../contacts/${item.supplier.id}/edit?tab=supplier`}
          className={`flex my-auto text-brand-600`}
        >
          {item.supplier.name}
        </Link>
      </td>
      <td className="px-5 py-1 text-gray-500 text-start text-theme-xs dark:text-gray-400 whitespace-nowrap">
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
      </td>
      <td className="px-4 py-1.5 text-black text-end text-theme-xs dark:text-white font-medium whitespace-nowrap">
        {formatIDRLocale(item.total_amount, { withSymbol: true })}
      </td>

      <td className="px-4 py-1  whitespace-nowrap text-gray-500 text-end text-theme-xs dark:text-gray-400">
        {/* <TableItemMenu
          id={item.id}
          name={item.document_number}
          date={parseYMDToDate(item.date)}
        /> */}
        <TableItemAction
          id={item.id}
          invoice={item.document_number}
          date={parseYMDToDate(item.date)}
          openDropdownId={openDropdownId}
          setOpenDropdownId={setOpenDropdownId}
        />
      </td>
    </tr>
  );
}
