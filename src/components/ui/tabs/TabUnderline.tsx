import type { Option } from "@def/option";
import { useState } from "react";

interface ExtraOption extends Option {
    icon?: React.ReactNode;
}

interface Props {
    tabs: ExtraOption[];
    initialActive: string;
    className?: string;
    onChange?: (param: string) => void;
}

export default function TabUnderline({
    tabs,
    initialActive,
    className,
    onChange,
}: Props) {
    const [activeTab, setActiveTab] = useState<string>(initialActive);


    const handleChange = (value: string) => {
        setActiveTab(value);
        onChange?.(value);
    };

    const tabClass = (value: string) =>
        `inline-flex items-center gap-2 border-b-2 px-2.5 py-2 text-sm font-medium transition-colors duration-200 ease-in-out ${activeTab === value
            ? "text-brand-500 border-brand-500 dark:text-brand-400 dark:border-brand-400"
            : "bg-transparent text-gray-500 border-transparent hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        }`;
    return (
        <>
            <div className="border-b border-gray-200 dark:border-gray-800">
                <nav
                    className={`-mb-px flex space-x-2 overflow-x-auto
                [&::-webkit-scrollbar-thumb]:rounded-full
                [&::-webkit-scrollbar-thumb]:bg-gray-200
                dark:[&::-webkit-scrollbar-thumb]:bg-gray-600
                [&::-webkit-scrollbar-track]:bg-transparent
                [&::-webkit-scrollbar]:h-1.5
                ${className}`}
                >
                    {tabs.map((tab) => (
                        <button
                            key={tab.value}
                            className={tabClass(tab.value)}
                            onClick={() => handleChange(tab.value)}
                            type="button"
                        >
                            {tab.icon && <span className="size-5">{tab.icon}</span>}
                            {tab.label}
                        </button>
                    ))}
                </nav>
            </div>
        </>

    );
}


