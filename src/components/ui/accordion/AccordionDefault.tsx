import { useState } from "react";
import { HiChevronDown } from "react-icons/hi2";

interface AccordionItemProps {
    title: string;
    children: React.ReactNode;
    defaultOpen?: boolean;
}

export default function AccordionDefault({
    title,
    children,
    defaultOpen = false,
}: AccordionItemProps) {
    const [open, setOpen] = useState(defaultOpen);

    return (
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
            {/* Header */}
            <div
                className="flex cursor-pointer items-center justify-between py-3 pl-6 pr-3 bg-gray-50 dark:bg-white/[0.03]"
                onClick={() => setOpen((v) => !v)}
            >
                <h4 className="text-lg font-medium text-gray-800 dark:text-white/90">
                    {title}
                </h4>

                <button
                    type="button"
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gray-100 transition-transform duration-200 ease-linear
            dark:bg-white/[0.03] text-gray-800 dark:text-white/90
            ${open ? "rotate-180" : ""}`}
                >
                    <HiChevronDown className="size-5" />
                </button>
            </div>

            {/* Content */}
            {open && (
                <div className="px-6 py-7">
                    <p className="text-base text-gray-500 dark:text-gray-400">
                        {children}
                    </p>
                </div>
            )}
        </div>
    );
}
