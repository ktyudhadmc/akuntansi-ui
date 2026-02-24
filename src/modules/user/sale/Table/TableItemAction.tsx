import { Dropdown, DropdownItem } from "@components/ui/dropdown";
import { HiDotsVertical, HiEye, HiPencil, HiTrash } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import DeleteSale from "../Action/Delete";
import { useModal } from "@hooks/useModal";

interface Props {
  id: string;
  invoice: string;
  openDropdownId: string | null;
  setOpenDropdownId: (id: string | null) => void;
}

export default function TableItemAction({
  id,
  invoice,
  openDropdownId,
  setOpenDropdownId,
}: Props) {
  const navigate = useNavigate();
  const isOpenDropdown = openDropdownId === id;

  const { openModal, isOpen, closeModal } = useModal();

  function toggleDropdown() {
    setOpenDropdownId(isOpen ? null : id);
  }

  function closeDropdown() {
    setOpenDropdownId(null);
  }

  return (
    <>
      <DeleteSale
        id={id}
        invoice={invoice}
        key={`modal-delete-${id}`}
        onOpen={isOpen}
        onClose={closeModal}
      />

      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="flex items-center text-gray-700 dropdown-toggle dark:text-gray-400"
        >
          <HiDotsVertical />
        </button>

        <Dropdown
          isOpen={isOpenDropdown}
          onClose={closeDropdown}
          className="absolute right-0 flex flex-col rounded-lg border border-gray-200 bg-white p-2 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark"
        >
          <ul className="flex gap-1 border-gray-200 dark:border-gray-800">
            <li>
              <DropdownItem
                onItemClick={() => navigate(`${id}`)}
                className="flex items-center !px-3 font-medium text-gray-700 rounded-md group text-theme-xs hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
              >
                <HiEye className="fill-gray-500 group-hover:fill-gray-700 dark:fill-gray-400 dark:group-hover:fill-gray-300" />
              </DropdownItem>
            </li>
            <li>
              <DropdownItem
                onItemClick={() => navigate(`${id}/edit`)}
                className="flex items-center !px-3 font-medium text-gray-700 rounded-md group text-theme-xs hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
              >
                <HiPencil className="fill-gray-500 group-hover:fill-gray-700 dark:fill-gray-400 dark:group-hover:fill-gray-300" />
              </DropdownItem>
            </li>
            <li>
              <DropdownItem
                onItemClick={openModal}
                className="flex items-center !px-3 font-medium text-gray-700 rounded-md group text-theme-xs hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
              >
                <HiTrash className="fill-gray-500 group-hover:fill-gray-700 dark:fill-gray-400 dark:group-hover:fill-gray-300" />
              </DropdownItem>
            </li>
          </ul>
        </Dropdown>
      </div>
    </>
  );
}
