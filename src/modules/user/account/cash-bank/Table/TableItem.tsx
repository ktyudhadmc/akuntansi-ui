import Button from "@components/ui/button/Button";

import type { Account } from "@services/user/account/index/interfaces/response.type";
import { formatIDR } from "@helpers/index";

// import TableItemMenu from "./TableItemMenu";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";

import { Dropdown } from "@components/ui/dropdown/Dropdown";
import { DropdownItem } from "@components/ui/dropdown/DropdownItem";
import { useModal } from "@hooks/useModal";
import AccountBankIntegrationCreate from "../Action/CreateBankLink";

interface Props {
  item: Account;
}

export default function TableItem({ item }: Props) {
  const navigate = useNavigate();
  const { openModal, isOpen, closeModal } = useModal();
  const [isOpenDropown, setIsOpenDropdown] = useState(false);
  function toggleDropdown() {
    setIsOpenDropdown(!isOpenDropown);
  }

  function closeDropdown() {
    setIsOpenDropdown(false);
  }

  return (
    <tr>
      <td className="text-brand-600 dark:text-white text-start text-theme-xs font-medium ">
        <Link
          to={`${item.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex py-1 px-5`}
        >
          {item.code}
        </Link>
      </td>
      <td className="px-5 py-1 text-gray-500 text-start text-theme-xs dark:text-gray-400 ">
        <AccountBankIntegrationCreate
          onOpen={isOpen}
          onClose={closeModal}
          item={item}
        />
        <div className="flex md:flex-row flex-col justify-between gap-2">
          <Link
            to={`${item.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex my-auto text-brand-600`}
          >
            {item.name}
          </Link>
          <Button
            variant="outline"
            size="xs"
            className="whitespace-nowrap"
            onClick={openModal}
          >
            Hubungkan ke bank
          </Button>
        </div>
      </td>
      <td className="px-4 py-1  whitespace-nowrap text-gray-500 text-end text-theme-xs dark:text-gray-400">
        {formatIDR(0)}
      </td>
      <td className="px-4 py-1  whitespace-nowrap text-gray-500 text-end text-theme-xs dark:text-gray-400">
        {formatIDR(0)}
      </td>
      <td className="px-4 py-1  whitespace-nowrap text-gray-500 text-end text-theme-xs dark:text-gray-400 z-[100001]">
        {/* <TableItemMenu id={item.id} name={item.name} code={item.code} /> */}

        <div className="relative ">
          <div className="flex whitespace-nowrap justify-end">
            <button
              onClick={() => navigate(`import`)}
              className="px-3 py-2.5 text-theme-xs bg-white text-brand-600 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:ring-gray-700 dark:hover:bg-white/[0.03] dark:hover:text-gray-300 font-medium rounded inline-flex items-center justify-center gap-2 rounded-l-lg rounded-r-none transition"
            >
              Impor rekening koran
            </button>
            <button
              onClick={toggleDropdown}
              className="dropdown-toggle px-3 py-2.5 text-theme-xs bg-white text-brand-600 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:ring-gray-700 dark:hover:bg-white/[0.03] dark:hover:text-gray-300 font-medium rounded inline-flex items-center justify-center gap-2 rounded-r-lg rounded-l-none transition"
            >
              <AiFillCaretDown />
            </button>
          </div>
          <Dropdown isOpen={isOpenDropown} onClose={closeDropdown} >
            <DropdownItem>Transfer Uang</DropdownItem>
            <DropdownItem>Terima Uang</DropdownItem>
            <DropdownItem>Kirim Uang</DropdownItem>
          </Dropdown>
        </div>
      </td>
    </tr>
  );
}
