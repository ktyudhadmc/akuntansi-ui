import { useState } from "react";
import { usePopper } from "react-popper";
import { AiOutlineMore } from "react-icons/ai";

interface ActionItem {
  label: string;
  onClick: () => void;
  danger?: boolean;
}

interface ActionMenuProps {
  items: ActionItem[];
}

export default function ActionMenu({ items }: ActionMenuProps) {
  const [open, setOpen] = useState(false);
  const [referenceElement, setReferenceElement] =
    useState<HTMLButtonElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null,
  );

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: "bottom-end",
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [0, 8],
        },
      },
      {
        name: "preventOverflow",
        options: {
          padding: 8,
        },
      },
    ],
  });

  return (
    <>
      {/* Trigger */}
      <button
        ref={setReferenceElement}
        onClick={() => setOpen((prev) => !prev)}
        className="p-1 rounded-lg text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-white/5"
      >
        <AiOutlineMore size={20} />
      </button>

      {/* Dropdown */}
      {open && (
        <div
          ref={setPopperElement}
          style={styles.popper}
          {...attributes.popper}
          className="z-50 w-40 rounded-xl border border-gray-200 bg-white shadow-lg dark:border-gray-800 dark:bg-gray-900"
        >
          <div className="py-2 space-y-1 flex flex-col">
            {items.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  item.onClick();
                  setOpen(false);
                }}
                className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${
                  item.danger
                    ? "text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10"
                    : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-white/5"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
