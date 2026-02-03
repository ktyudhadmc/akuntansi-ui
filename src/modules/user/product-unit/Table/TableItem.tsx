import { HiPencil, HiTrash } from "react-icons/hi";
import { useModal } from "@hooks/useModal";

import Button from "@components/ui/button/Button";
import ProductUnitDelete from "../Action/Delete";

import type { Unit } from "@services/user/product/unit/interfaces/response.type";
import ProductUnitCreate from "../Action/Create";

interface Props {
  item: Unit;
}

export default function TableItem({ item }: Props) {
  const { openModal, isOpen, closeModal } = useModal();
  const {
    openModal: updateOpenModal,
    isOpen: updateIsOpen,
    closeModal: updateCloseModal,
  } = useModal();

  return (
    <>
      <ProductUnitCreate
        onOpen={updateIsOpen}
        onClose={updateCloseModal}
        item={item}
      />
      <tr>
        <td className="px-5 py-1 text-gray-500 text-start text-theme-xs dark:text-gray-400 whitespace-nowrap font-semibold">
          {item.name}
        </td>

        <td className="px-4 py-1  whitespace-nowrap text-gray-500 text-end text-theme-xs dark:text-gray-400">
          <ProductUnitDelete
            id={item.id}
            name={item.name}
            key={`modal-delete-${item.id}`}
            onOpen={isOpen}
            onClose={closeModal}
          />

          <div className="flex gap-2 justify-end">
            {/* edit */}
            <Button onClick={updateOpenModal} size="xs" variant="outline">
              <HiPencil />
            </Button>

            {/* delete */}
            <Button onClick={openModal} size="xs" variant="outline">
              <HiTrash />
            </Button>
          </div>
        </td>
      </tr>
    </>
  );
}
