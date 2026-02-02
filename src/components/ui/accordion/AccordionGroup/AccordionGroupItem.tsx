import { useLayoutEffect, useRef, useState } from "react";
import { HiChevronDown } from "react-icons/hi2";
import { useAccordion } from "./AccordionGroupContext";

export default function AccordionGroupItem({
    id,
    title,
    children,
}: {
    id: string;
    title: string;
    children: React.ReactNode;
}) {
    const { active, setActive } = useAccordion();
    const isOpen = active === id;
    const contentRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState<number>(0);

    useLayoutEffect(() => {
        if (contentRef.current) {
            setHeight(contentRef.current.scrollHeight);
        }
    }, [children]);

    return (
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
            {/* Header */}
            <button
                type="button"
                onClick={() => setActive(isOpen ? null : id)}
                className="flex w-full items-center justify-between bg-gray-50 py-3 pl-6 pr-3 dark:bg-white/[0.03]"
            >
                <h4 className="text-left text-lg font-medium text-gray-800 dark:text-white/90">
                    {title}
                </h4>

                <span
                    className={`flex h-12 w-12 items-center justify-center rounded-full
          bg-gray-100 transition-transform duration-200 ease-linear
          dark:bg-white/[0.03] text-gray-800 dark:text-white/90
          ${isOpen ? "rotate-180" : ""}`}
                >
                    <HiChevronDown className="size-5" />
                </span>
            </button>

            {/* Content */}
            <div
                style={{
                    maxHeight: isOpen ? `${height}px` : "0px",
                }}
                className="overflow-hidden transition-[max-height] duration-300 ease-in-out"
            >
                <div ref={contentRef} className="px-6 py-7 text-base text-gray-500 dark:text-gray-400">
                    {children}
                </div>
            </div>
        </div>
    );
}
