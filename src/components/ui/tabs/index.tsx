import type { Option } from "@def/option";
import { useState } from "react";

interface Props {
  tabs: Option[];
  initialActive: string;
  className?: string;
  onChange?: (param: string) => void;
}

export default function TabsNav({
  tabs,
  initialActive,
  className,
  onChange,
}: Props) {
  const [activeTab, setActiveTab] = useState<string>(initialActive);

  const handleOnChange = (value: string) => {
    setActiveTab(value);

    if (onChange) onChange(value);
  };

  const tabClass = (tab: string) =>
    `items-center rounded-md px-3 py-2 md:w-fit w-full text-center text-sm  font-medium transition-colors duration-200 ease-in-out ${
      activeTab === tab
        ? "bg-white text-gray-900 shadow-theme-xs dark:bg-white/[0.03] dark:text-white"
        : "bg-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
    }`;

  return (
    <>
      <nav
        className={`flex overflow-x-auto rounded-lg bg-gray-100 p-1 dark:bg-gray-900 lg:w-fit
        [&::-webkit-scrollbar-thumb]:rounded-full
        [&::-webkit-scrollbar-thumb]:bg-gray-200
      dark:[&::-webkit-scrollbar-thumb]:bg-gray-600
      [&::-webkit-scrollbar-track]:bg-white
      dark:[&::-webkit-scrollbar-track]:bg-transparent
      [&::-webkit-scrollbar]:h-1.5 ${className}`}
      >
        {tabs.map((item, idx) => (
          <button
            key={`btn-key-${idx}`}
            className={tabClass(item.value)}
            onClick={() => handleOnChange(item.value)}
          >
            {item.label}
          </button>
        ))}
      </nav>
      <hr />
    </>
  );
}
