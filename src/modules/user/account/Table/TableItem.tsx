import Button from "@components/ui/button/Button";
import { Dropdown } from "@components/ui/dropdown/Dropdown";
import { DropdownItem } from "@components/ui/dropdown/DropdownItem";

import { AiFillCaretDown } from "react-icons/ai";

import type { Account } from "@services/user/account/interfaces/response.type";
import { formattedCurrency } from "@helpers/currency";
import { useState } from "react";
import TableItemMenu from "./TableItemMenu";

interface Props {
  nomor: number;
  item: Account;
}

export default function TableItem({ nomor, item }: Props) {
  const [isOpenDropown, setIsOpenDropdown] = useState(false);
  function toggleDropdown() {
    setIsOpenDropdown(!isOpenDropown);
  }

  function closeDropdown() {
    setIsOpenDropdown(false);
  }

  return (
    <tr>
      <td className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
        {nomor}
      </td>
      <td className="px-5 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
        {item.code}
      </td>
      <td className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
        <div className="w-full flex whitespace-nowrap gap-4 justify-between my-auto">
          <p className="my-auto"> {item.name}</p>
          <div>
            <Button variant="outline" size="sm">
              Hubungkan ke bank
            </Button>
          </div>
        </div>
      </td>
      <td className="px-4 py-3  whitespace-nowrap text-gray-500 text-start text-theme-sm dark:text-gray-400">
        {formattedCurrency(0)}
      </td>
      <td className="px-4 py-3  whitespace-nowrap text-gray-500 text-start text-theme-sm dark:text-gray-400">
        {formattedCurrency(0)}
      </td>
      <td className="py-3 text-gray-500 text-end text-theme-sm dark:text-gray-400">
        <div className="flex whitespace-nowrap">
          <button className="px-4 py-3 text-sm bg-white text-brand-600 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:ring-gray-700 dark:hover:bg-white/[0.03] dark:hover:text-gray-300 font-medium rounded inline-flex items-center justify-center gap-2 rounded-l-lg rounded-r-none transition">
            Impor rekening koran
          </button>
          <button
            onClick={toggleDropdown}
            className="dropdown-toggle px-4 py-3 text-sm bg-white text-brand-600 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:ring-gray-700 dark:hover:bg-white/[0.03] dark:hover:text-gray-300 font-medium rounded inline-flex items-center justify-center gap-2 rounded-r-lg rounded-l-none transition"
          >
            <AiFillCaretDown />
          </button>
        </div>
        <Dropdown isOpen={isOpenDropown} onClose={closeDropdown}>
          <DropdownItem>Transfer Uang</DropdownItem>
          <DropdownItem>Terima Uang</DropdownItem>
          <DropdownItem>Kirim Uang</DropdownItem>
        </Dropdown>
      </td>
      <td>
        <TableItemMenu id={item.id} name={item.name} />
      </td>
    </tr>
  );
}
