import { HiDotsHorizontal, HiEye, HiPencil, HiTrash } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import {
  useFloating,
  offset,
  flip,
  shift,
  autoUpdate,
  useDismiss,
  useInteractions,
} from "@floating-ui/react";
import { createPortal } from "react-dom";

import DeletePurchase from "../Action/Delete";
import { useModal } from "@hooks/useModal";

interface Props {
  id: string;
  invoice: string;
  date: Date;
  openDropdownId: string | null;
  setOpenDropdownId: (id: string | null) => void;
}

export default function TableItemAction({
  id,
  invoice,
  date,
  openDropdownId,
  setOpenDropdownId,
}: Props) {
  const navigate = useNavigate();
  const isOpenDropdown = openDropdownId === id;

  const { openModal, isOpen, closeModal } = useModal();

  function toggleDropdown() {
    setOpenDropdownId(isOpenDropdown ? null : id);
  }

  function closeDropdown() {
    setOpenDropdownId(null);
  }

  const { refs, floatingStyles, context } = useFloating({
    open: isOpenDropdown,
    onOpenChange: (open) => {
      if (!open) closeDropdown();
    },
    placement: "left-start",
    middleware: [offset(6), flip(), shift({ padding: 8 })],
    whileElementsMounted: autoUpdate,
  });

  const dismiss = useDismiss(context, {
    ancestorScroll: true,
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([dismiss]);

  return (
    <>
      <DeletePurchase
        id={id}
        date={date}
        name={invoice}
        key={`modal-delete-${id}`}
        onOpen={isOpen}
        onClose={closeModal}
      />

      <div className="relative inline-block">
        <div>
          <button
            ref={refs.setReference}
            {...getReferenceProps({
              onClick: toggleDropdown,
            })}
            className="text-gray-500 dark:text-gray-400 "
          >
            <HiDotsHorizontal size={16} />
          </button>
        </div>

        {isOpenDropdown &&
          createPortal(
            <div
              ref={refs.setFloating}
              style={floatingStyles}
              {...getFloatingProps()}
              className="z-10"
            >
              <div
                className="p-2 bg-white border border-gray-200 rounded-2xl shadow-lg dark:border-gray-800 dark:bg-gray-900"
                style={{ display: "block" }}
              >
                <div className="space-y-1 flex">
                  <button
                    onClick={() => navigate(`${id}`)}
                    className="text-xs flex w-full rounded-lg px-3 py-2 text-left font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                  >
                    <HiEye />
                  </button>
                  <button
                    onClick={() => navigate(`${id}/edit`)}
                    className="text-xs flex w-full rounded-lg px-3 py-2 text-left font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                  >
                    <HiPencil />
                  </button>
                  <button
                    onClick={openModal}
                    className="text-xs flex w-full rounded-lg px-3 py-2 text-left font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                  >
                    <HiTrash />
                  </button>
                </div>
              </div>
            </div>,
            document.body,
          )}
      </div>
    </>
  );
}
