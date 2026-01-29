import Button from "@components/ui/button/Button";
import DeleteAccount from "../Action/Delete";
import { HiTrash, HiPencil } from "react-icons/hi";
import { useModal } from "@hooks/useModal";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { Dropdown } from "@components/ui/dropdown/Dropdown";
import { DropdownItem } from "@components/ui/dropdown/DropdownItem";

import { AiFillCaretDown } from "react-icons/ai";

interface Props {
  id: number;
  code: string;
  name: string;
}

export default function TableItemMenu({ id, code, name }: Props) {
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
    <>
      <DeleteAccount
        id={id}
        code={code}
        name={name}
        key={`modal-delete-${name}`}
        onOpen={isOpen}
        onClose={closeModal}
      />

      <div className="flex gap-2">
        <div className="relative">
          <div className="flex whitespace-nowrap">
            <button
              onClick={() => navigate(`${id}/import`)}
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
          <Dropdown isOpen={isOpenDropown} onClose={closeDropdown}>
            <DropdownItem>Transfer Uang</DropdownItem>
            <DropdownItem>Terima Uang</DropdownItem>
            <DropdownItem>Kirim Uang</DropdownItem>
          </Dropdown>
        </div>

        {/* edit */}
        <Button
          onClick={() => navigate(`${id}/edit`)}
          size="xs"
          variant="outline"
        >
          <HiPencil />
        </Button>

        {/* delete */}
        <Button onClick={openModal} size="xs" variant="outline">
          <HiTrash />
        </Button>
      </div>
    </>
  );
}
