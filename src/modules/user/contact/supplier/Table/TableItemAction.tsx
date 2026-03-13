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

import { useModal } from "@hooks/useModal";

import DeleteSupplier from "../Action/Delete";
import ShowSupplier from "../Action/Show";
import type { Contact } from "@services/user/supplier/interfaces/response.type";

interface Props {
  item: Contact;
  openDropdownId: number | null;
  setOpenDropdownId: (id: number | null) => void;
}

export default function TableItemAction({
  item,
  openDropdownId,
  setOpenDropdownId,
}: Props) {
  const navigate = useNavigate();
  const isOpenDropdown = openDropdownId === item.id;

  const { openModal, isOpen, closeModal } = useModal();
  const {
    openModal: openModalShow,
    isOpen: isOpenModalShow,
    closeModal: closeModalShow,
  } = useModal();

  function toggleDropdown() {
    setOpenDropdownId(isOpenDropdown ? null : item.id);
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
      <ShowSupplier
        item={item}
        onOpen={isOpenModalShow}
        onClose={closeModalShow}
        key={`modal-show-${item.id}`}
      />
      <DeleteSupplier
        id={Number(item.id)}
        code={item.code}
        name={item.name}
        key={`modal-delete-${item.id}`}
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
                    onClick={openModalShow}
                    className="text-xs flex w-full rounded-lg px-3 py-2 text-left font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                  >
                    <HiEye />
                  </button>
                  <button
                    onClick={() => navigate(`${item.id}/edit?tab=supplier`)}
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
