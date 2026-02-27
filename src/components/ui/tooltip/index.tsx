import { useState } from "react";
import clsx from "clsx";

interface Props {
  text?: string;
  placement?: "top" | "bottom" | "left" | "right";
  className?: string;
  children: React.ReactNode;
}

export function Tooltip({
  text,
  placement = "top",
  children,
  className,
}: Props) {
  const [show, setShow] = useState(false);

  const position = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  const arrowPosition = {
    top: "bottom-[-6px] left-1/2 -translate-x-1/2",
    bottom: "top-[-6px] left-1/2 -translate-x-1/2",
    left: "right-[-6px] top-1/2 -translate-y-1/2",
    right: "left-[-6px] top-1/2 -translate-y-1/2",
  };

  const arrowBorder = {
    top: "border-r border-b",
    bottom: "border-l border-t",
    left: "border-t border-r",
    right: "border-b border-l",
  };

  return (
    <div
      className="relative inline-flex w-fit"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}

      {show && (
        <div role="tooltip" className={`absolute z-50 ${position[placement]}`}>
          <div
            className={clsx(
              "relative min-w-48 max-w-xs text-center rounded-lg px-3.5 py-2 text-xs font-medium shadow-md bg-white text-gray-700 border border-gray-200 dark:bg-[#1E2634] dark:text-white dark:border-gray-700",
              className,
            )}
          >
            {text}

            {/* Arrow */}
            <div
              className={clsx(
                `absolute w-3 h-3 rotate-45 bg-white dark:bg-[#1E2634] border-gray-200 dark:border-gray-700`,
                arrowBorder[placement],
                arrowPosition[placement],
              )}
            />
          </div>
        </div>
      )}
    </div>
  );
}
