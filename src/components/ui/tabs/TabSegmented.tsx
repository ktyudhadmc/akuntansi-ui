import type { Option } from "@def/option";
import { useEffect, useRef, useState } from "react";


interface Props {
    tabs: Option[];
    initialActive?: string;
    onChange?: (value: string) => void;
}

export function TabSegmented({
    tabs,
    initialActive,
    onChange,
}: Props) {
    const [active, setActive] = useState(
        initialActive ?? tabs[0]?.value
    );

    const containerRef = useRef<HTMLDivElement>(null);
    const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);
    const [sliderStyle, setSliderStyle] = useState({
        width: 0,
        x: 0,
    });

    useEffect(() => {
        const index = tabs.findIndex((t) => t.value === active);
        const btn = btnRefs.current[index];

        if (btn) {
            setSliderStyle({
                width: btn.offsetWidth,
                x: btn.offsetLeft - 4,
            });
        }
    }, [active, tabs]);

    const handleChange = (value: string) => {
        setActive(value);
        onChange?.(value);
    };

    return (
        <div
            ref={containerRef}
            className="relative inline-flex p-1 rounded-full bg-gray-200 dark:bg-gray-800"
        >
            {/* Slider */}
            <span
                className="absolute inset-y-1 rounded-full bg-white shadow-theme-xs transition-all duration-200 ease-linear dark:bg-white/10"
                style={{
                    width: sliderStyle.width,
                    transform: `translateX(${sliderStyle.x}px)`,
                }}
            />

            {tabs.map((tab, i) => (
                <button
                    key={tab.value}
                    ref={(el) => {
                        btnRefs.current[i] = el;
                    }}
                    onClick={() => handleChange(tab.value)}
                    className={`relative z-10 flex h-9 lg:h-11 px-3 lg:px-6 items-center justify-center text-theme-sm lg:text-base font-medium transition-colors duration-200 ${active === tab.value
                        ? "text-gray-800 dark:text-white/90"
                        : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white/80"
                        }`}
                >
                    {tab.label}
                </button>
            ))}

        </div>
    );
}



/** EXAMPLE */
{/* <TabSegmented
    tabs={[
        { label: "Monthly", value: "monthly" },
        { label: "Annually", value: "annually" },
    ]}
    initialActive="monthly"
    onChange={(v) => console.log(v)}
/> */}