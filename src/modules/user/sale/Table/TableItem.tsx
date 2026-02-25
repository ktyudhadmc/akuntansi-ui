import { Link } from "react-router-dom";

import { formatIDRLocale } from "@helpers/currency";
import Badge from "@components/ui/badge/Badge";

import type { Sale } from "@services/user/sale/interfaces/response.type";
import TableItemAction from "./TableItemAction";

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
          to={`../contacts/${item.customer.id}/edit?tab=customer`}
          className={`flex my-auto text-brand-600`}
        >
          {item.customer.name}
        </Link>
      </td>

      <td className="px-5 py-1 text-gray-500 text-start text-theme-xs dark:text-gray-400 whitespace-nowrap">
        <Badge size="sm" color={isService ? "info" : "success"}>
          {item.items[0]?.service_type.name}
        </Badge>
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

      <td className="relative overflow-visible px-4 py-1.5 text-black text-end text-theme-xs dark:text-white font-medium">
        {formatIDRLocale(item.total_gross, { withSymbol: true })}
      </td>

      {/* <td className=" px-4 py-4 text-gray-700 text-theme-sm dark:text-gray-400">
        <div className="relative inline-block">
          <div>
            <div>
              <button className="text-gray-500 dark:text-gray-400 ">
                <svg
                  className="fill-current"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M5.99902 10.245C6.96552 10.245 7.74902 11.0285 7.74902 11.995V12.005C7.74902 12.9715 6.96552 13.755 5.99902 13.755C5.03253 13.755 4.24902 12.9715 4.24902 12.005V11.995C4.24902 11.0285 5.03253 10.245 5.99902 10.245ZM17.999 10.245C18.9655 10.245 19.749 11.0285 19.749 11.995V12.005C19.749 12.9715 18.9655 13.755 17.999 13.755C17.0325 13.755 16.249 12.9715 16.249 12.005V11.995C16.249 11.0285 17.0325 10.245 17.999 10.245ZM13.749 11.995C13.749 11.0285 12.9655 10.245 11.999 10.245C11.0325 10.245 10.249 11.0285 10.249 11.995V12.005C10.249 12.9715 11.0325 13.755 11.999 13.755C12.9655 13.755 13.749 12.9715 13.749 12.005V11.995Z"
                    fill=""
                  ></path>
                </svg>
              </button>
            </div>
            <div
              className="z-10"
              data-popper-placement="top-end"
              style={{
                position: "absolute",
                inset: "auto 0px 0px auto",
                margin: "0px",
                transform: ": translate(-24px, -33px)",
              }}
              data-popper-reference-hidden=""
              data-popper-escaped=""
            >
              <div
                className="p-2 bg-white border border-gray-200 rounded-2xl shadow-lg dark:border-gray-800 dark:bg-gray-900 w-40"
                style={{ display: "block" }}
              >
                <div
                  className="space-y-1"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  <button className="text-xs flex w-full rounded-lg px-3 py-2 text-left font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300">
                    View More
                  </button>
                  <button className="text-xs flex w-full rounded-lg px-3 py-2 text-left font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </td> */}
      <td className="px-4 py-1  whitespace-nowrap text-gray-500 text-end text-theme-xs dark:text-gray-400">
        {/* <TableItemMenu id={item.id} invoice={item.document_number} /> */}
        <TableItemAction
          id={item.id}
          invoice={item.document_number}
          openDropdownId={openDropdownId}
          setOpenDropdownId={setOpenDropdownId}
        />
      </td>
    </tr>
  );
}
